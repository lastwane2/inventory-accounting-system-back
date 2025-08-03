import { Request, Response, NextFunction } from 'express'
import { firebaseAuth } from './firebase/admin'

export interface AuthenticatedRequest extends Request {
  user?: {
    userId: string 
    userEmail: string
    [key: string]: any
  }
}

export const authMiddleware = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Unauthorized: No token' })
  }

  const token = authHeader.split(' ')[1]

  try {
    const decodedToken = await firebaseAuth.verifyIdToken(token!)

    req.user = {
      userId: decodedToken.uid,
      userEmail: decodedToken.email!,
      ...decodedToken,
    }

    next()
  } catch (error) {
    console.error('[authMiddleware] Token verification failed:', error)
    return res.status(403).json({ message: 'Forbidden: Invalid token' })
  }
}

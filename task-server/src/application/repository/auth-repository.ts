import { AuthEntity } from "../../domain/authentication"


export interface AuthRepository{
  signInWithGoogle():Promise<void>
  logInWithEmailAndPassword(auth:Omit<AuthEntity,'uuid' |"name" | "createdAt" |
  "updatedAt">):Promise<void>
  registerWithEmailAndPassword(auth:Omit<AuthEntity,'uuid' |"name"| "createdAt" |
  "updatedAt">):Promise<void>
  sendPasswordReset(email:string):Promise<void>
  logout():Promise<void>
}
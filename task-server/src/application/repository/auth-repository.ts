import { AuthEntity } from "../../domain/authentication"
import { OutPutUserAuth } from "../../infra/dto/dto"


export interface AuthRepository{
  signInWithGoogle():Promise<void>
  logInWithEmailAndPassword(auth:Omit<AuthEntity,'uuid'|"createdAt" |
  "updatedAt">):Promise<OutPutUserAuth>
  registerWithEmailAndPassword(auth:Omit<AuthEntity, "createdAt" |
  "updatedAt">):Promise<OutPutUserAuth>
  sendPasswordReset(email:string):Promise<void>
  logout():Promise<void>
}
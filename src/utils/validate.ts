 export function validatePhoneNumber(phoneNumber:string) {
  let regex = /^1[3456789]\d{9}$/;
  return regex.test(phoneNumber);
}

 export function validateAccount(account:string) {
   let regex = /^[a-zA-Z0-9]{4,12}$/;
   return regex.test(account);
 }
 export function validatePassword(password:string) {
   let regex = /^(?=.*[a-z])(?=.*\d)[a-zA-Z\d!@#$%^&*]{6,20}$/;
   return regex.test(password);
 }

 export function validateEmail(password:string) {
   let regex = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/;
   return regex.test(password);
 }

export type Validators = {
  [key: string]: {
    (input: HTMLInputElement): any;
  };
};

export const defaultValidators: Validators = {
basic: (input) => {
  return input.value.length > 0
},
email: (input) => {
  let matches = input.value.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/);
  return (matches && matches.length > 0)
},
radio: (input) => {
  let checked = document.querySelector(`input[name="${input.name}"]:checked`) as HTMLInputElement;
  
  if(checked && checked.value === 'skip') {
    return 2;
  }
  return (checked && checked.value.length > 0)
},
phone: (input) => {
  if(!input.value || input.value == ""){
    return;
  }
  
  var reg = new RegExp(/^[0-9\s-+()]*$/m);  
  return reg.test(input.value);
},
checkbox: (input) => {
  let checked = document.querySelector(`input[name="${input.name}"]:checked`) as HTMLInputElement;
  return (checked && checked.value.length > 0)
}
}
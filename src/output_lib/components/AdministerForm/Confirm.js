//@ flow

export default function Confirm(
  confirmMessage: string,
  yesFunction: Function,
  noFunction: Function
) {
  let result = confirm(confirmMessage);
  result ? yesFunction() : noFunction();
}

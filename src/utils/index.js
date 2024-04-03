export function isMobile() {
  const userAgent = navigator.userAgent;
  if (/Android|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent)) {
    return true;
  }
  return false;
}
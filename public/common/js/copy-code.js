const copyCode = {
  copyCode: (e) => {
    const pre = e.getElementsByTagName("pre")[0];
    navigator.clipboard.writeText(pre.innerText)
  }
};
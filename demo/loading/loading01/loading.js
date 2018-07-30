document.onreadystatechange = function() {
  console.log(document.readyState)
  if (document.readyState === 'complete') {
    document.querySelector('#loading').style.display = 'none'
  }
}
$root = $PSScriptRoot
$port = 3333
$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add("http://localhost:${port}/")
$listener.Start()
Write-Host "Serving $root on http://localhost:$port/"
$mimeTypes = @{
  ".html"="text/html; charset=utf-8";".css"="text/css";".js"="application/javascript";
  ".json"="application/json";".png"="image/png";".jpg"="image/jpeg";".svg"="image/svg+xml";
  ".txt"="text/plain"
}
while ($listener.IsListening) {
  $ctx = $listener.GetContext()
  $req = $ctx.Request; $res = $ctx.Response
  $urlPath = $req.Url.LocalPath.TrimStart('/')
  if ($urlPath -eq "" -or $urlPath -eq "/") { $urlPath = "index.html" }
  $file = Join-Path $root $urlPath
  if (Test-Path $file -PathType Leaf) {
    $ext = [System.IO.Path]::GetExtension($file)
    $mime = if ($mimeTypes.ContainsKey($ext)) { $mimeTypes[$ext] } else { "application/octet-stream" }
    $bytes = [System.IO.File]::ReadAllBytes($file)
    $res.ContentType = $mime; $res.ContentLength64 = $bytes.Length
    $res.OutputStream.Write($bytes, 0, $bytes.Length)
  } else {
    $res.StatusCode = 404
    $msg = [System.Text.Encoding]::UTF8.GetBytes("Not found")
    $res.ContentLength64 = $msg.Length; $res.OutputStream.Write($msg, 0, $msg.Length)
  }
  $res.OutputStream.Close()
}

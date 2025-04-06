# Binance API Proxy

这是一个用于中国大陆的 Binance API 代理服务。它通过 Vercel 部署，可以帮助用户绕过网络限制访问 Binance API。

## 使用方法

1. 将你的 Binance API 请求的域名从 `api.binance.com` 改为你的 Vercel 部署域名
2. 保持其他参数不变

例如：
- 原始请求: `https://api.binance.com/api/v3/exchangeInfo`
- 代理请求: `https://your-vercel-domain.vercel.app/api/v3/exchangeInfo`

## 部署

1. Fork 这个仓库
2. 在 Vercel 上导入你的 fork
3. 部署即可

## 注意事项

- 这个代理服务仅用于 API 请求，不适用于 WebSocket 连接
- 请遵守 Binance 的 API 使用条款和限制
- 建议使用 API 密钥进行身份验证 
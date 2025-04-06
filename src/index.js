export default {
  async fetch(request, env, ctx) {
    // 处理 CORS 预检请求
    if (request.method === 'OPTIONS') {
      return handleCORS();
    }

    // 获取请求的 URL
    const url = new URL(request.url);
    console.log('Received request:', {
      path: url.pathname,
      search: url.search,
      method: request.method,
      headers: Object.fromEntries(request.headers.entries())
    });
    
    // 构建 Binance API URL
    const binanceUrl = new URL('/api/v3' + url.pathname + url.search, env.BINANCE_API_URL);
    console.log('Proxying to:', binanceUrl.toString());
    
    // 复制原始请求的头部
    const headers = new Headers(request.headers);
    headers.delete('host');
    headers.delete('origin');
    headers.delete('referer');
    
    // 创建新的请求
    const newRequest = new Request(binanceUrl, {
      method: request.method,
      headers: headers,
      body: request.body
    });

    try {
      // 发送请求到 Binance API
      const response = await fetch(newRequest);
      console.log('Received response:', {
        status: response.status,
        statusText: response.statusText,
        headers: Object.fromEntries(response.headers.entries())
      });
      
      // 创建响应
      const newResponse = new Response(response.body, {
        status: response.status,
        statusText: response.statusText,
        headers: response.headers
      });
      
      // 添加 CORS 头部
      newResponse.headers.set('Access-Control-Allow-Origin', '*');
      newResponse.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
      newResponse.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
      
      return newResponse;
    } catch (error) {
      console.error('Error proxying request:', error);
      return new Response(JSON.stringify({ error: error.message }), {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      });
    }
  }
};

function handleCORS() {
  return new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      'Access-Control-Max-Age': '86400'
    }
  });
} 
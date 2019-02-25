function urlencoded(data) {
  return Object.keys(data)
    .filter(key => data[key] !== undefined && data[key] !== null)
    .map(key => `${key}=${encodeURIComponent(data[key])}`).join('&')
}

export function Get(url, options) {
  const data = options && options.data || {};
  options && delete options.data;
  const query = urlencoded(data);
  return fetch(query ? `${url}?${query}` : url, Object.assign({
    method: 'get',
    credentials: 'include'
  }, options))
    .then(res => {
      const data = res.json();
      if (data.redirect) {
        window.location.replace(data.redirect);
      }
      return data;
    });
}

export function Delete(url, options) {
  return fetch(url, Object.assign({
    method: 'delete',
    credentials: 'include'
  }, options))
    .then(res => {
      const data = res.json();
      if (data.redirect) {
        window.location.replace(data.redirect);
      }
      return data;
    });
}

export function Post(url, options) {
  return fetch(url, Object.assign({
    method: 'post',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
    }
  }, options))
    .then(res => {
      const data = res.json();
      if (data.redirect) {
        window.location.replace(data.redirect);
      }
      return data;
    });
}

export function PostForm(url, datas) {
  const formData = new FormData();
  Object.keys(datas).forEach(key => {
    formData.append(key, datas[key]);
  });
  return fetch(url, {
    method: 'post',
    credentials: 'include',
    body: formData
  })
    .then(res => {
      const data = res.json();
      if (data.redirect) {
        window.location.replace(data.redirect);
      }
      return data;
    });
}

export function PostJson(url, datas) {
  return fetch(url, {
    method: 'post',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(datas)
  })
    .then(res => {
      const data = res.json();
      if (data.redirect) {
        window.location.replace(data.redirect);
      }
      return data;
    });
}

/**
 * ajax方式请求
 * @param {*} url 上传url
 * @param {*} formData formData数据
 * @param {*} listen 监听事件
 * @param {*} header 请求头
 * @param {*} method 请求方式
 */
export function ajaxFun(url, formData, listen = {}, header, method) {
  return new Promise((resolve, reject) => {
    let xhr;
    if (window.XMLHttpRequest) { // code for IE7+, Firefox, Chrome, Opera, Safari
      xhr = new XMLHttpRequest();
    } else { // code for IE6, IE5
      xhr = new ActiveXObject("Microsoft.XMLHTTP");
    }
    listen.progress && xhr.upload.addEventListener("progress", listen.progress, false);
    listen.load && xhr.addEventListener("load", listen.load, false);
    listen.abort && xhr.addEventListener("abort", listen.abort, false);
    xhr.addEventListener("error", (err) => {
      !!listen.error && listen.error(err);
      reject(err);
    }, false);
    xhr.onreadystatechange = () => {
      if (xhr.status == 200 && xhr.readyState == 4) {
        try {
          resolve(JSON.parse(xhr.responseText))
        } catch (e) {
          reject(e);
        }
      }
    };
    xhr.open(method, url);
    for (let key in header) {
      xhr.setRequestHeader(key, header[key]);
    }
    formData ? xhr.send(formData) : xhr.send();
  })
}

export const ajaxFetch = {
  get: (url, querys, listener, header) => ajaxFun(`${url}?${urlencoded(querys)}`, false, listener, header, 'GET'),
  post: (url, formData, listener, header = {}) => ajaxFun(url, formData, listener, header, 'POST')
};

/**
 * 文件上传
 * progress 示例
 * function progress(evt) {
 *  if (evt.lengthComputable) {
      const percentComplete = Math.round(evt.loaded * 100 / evt.total);
      console.error(`上传进度为：${percentComplete}%`);
    } else {
      console.error('上传错误');
    }
 * }
 * @param {*} url 上传url
 * @param {*} formData formData 包含上传内容
 * @param {*} progress 监听事件progress
 * @param {*} header 请求头
 */
export function upload(url, formData, progress, header = {}) {
  return ajaxFetch.post(url, formData, {progress}, header);
}

export async function download(uri, options) {
  try {
    const { filename } = options;
    delete options.filename;
    const res = await fetch(uri, Object.assign({
      method: 'get',
      credentials: 'include'
    }, options));

    if (res.headers.get('content-type') === 'application/octet-stream') {
      const blob = await res.blob();
      const a = document.createElement('a');
      const url = window.URL.createObjectURL(blob);
      a.href = url;
      a.download = filename;
      a.click();
      window.URL.revokeObjectURL(url);
    } else {
      return res.json();
    }
  } catch(e) {
    throw e;
  }
}

// import md5 from 'crypto-js/md5'

import { CYQQ, JITA, GITLAB, BZQLL, FANYI, ELE } from './api'
import promiseRequest from './promiseRequest'

const getHotKey = async () => {
  try {
    const res = await promiseRequest({
      url: `${CYQQ}/splcloud/fcgi-bin/gethotkey.fcg?format=json`,
      showLoading: false,
      fail: () => {},
      isSuccess: res => res.code === 0,
    })

    return res
  } catch (e) {
    throw e
  }
}

const getJitaHome = async () => {
  try {
    const res = await promiseRequest({
      url: `${JITA}/api/home/index`,
      showLoading: true,
      fail: () => {},
      isSuccess: res => res.code === 1,
    })

    return res
  } catch (e) {
    throw e
  }
}

const getJitaSinger = async (id) => {
  try {
    const res = await promiseRequest({
      url: `${JITA}/api/home/index/singer_detail?id=${id}`,
      showLoading: true,
      fail: () => {},
      isSuccess: res => res.code === 1,
    })

    return res
  } catch (e) {
    throw e
  }
}

const getJitaSong = async (id) => {
  try {
    const res = await promiseRequest({
      url: `${JITA}/api/home/index/pu?id=${id}`,
      showLoading: true,
      fail: () => {},
      isSuccess: res => res.code === 1,
    })

    return res
  } catch (e) {
    throw e
  }
}

const searchJita = async (key) => {
  try {
    const res = await promiseRequest({
      url: `${JITA}/api/home/index/search?key=${key}`,
      showLoading: true,
      fail: () => {},
      isSuccess: res => res.code === 1,
    })

    return res
  } catch (e) {
    throw e
  }
}

const getMusicHome = async () => {
  try {
    const res = await promiseRequest({
      url: `${CYQQ}/v8/fcg-bin/fcg_myqq_topList.fcg?format=json`,
      showLoading: true,
      fail: () => {},
      isSuccess: res => res.code === 0,
    })

    return res
  } catch (e) {
    throw e
  }
}

const getMusicTopList = async (id) => {
  try {
    const res = await promiseRequest({
      url: `${CYQQ}/v8/fcg-bin/fcg_v8_toplist_cp.fcg?topid=${id}&format=json`,
      showLoading: true,
      fail: () => {},
      isSuccess: res => res.code === 0,
    })

    return res
  } catch (e) {
    throw e
  }
}

const getRainJoy1993Config = async () => {
  try {
    const res = await promiseRequest({
      url: `${GITLAB}/zhouyu1993/wx-miniprogram-config/raw/master/RainJoy1993/config.json`,
      showLoading: false,
      fail: () => {},
      isSuccess: res => res.code === 0,
    })

    return res
  } catch (e) {
    throw e
  }
}

const searchSong = async (key, page = 1) => {
  try {
    const res = await promiseRequest({
      url: `${BZQLL}/music/tencent/search?key=579621905&s=${key}&limit=10&offset=${page}&type=song`,
      showLoading: true,
      fail: () => {},
      isSuccess: res => res.code === 200,
    })

    return res
  } catch (e) {
    throw e
  }
}

const getSongIrc = async (mid) => {
  try {
    const res = await promiseRequest({
      url: `${BZQLL}/music/tencent/lrc?id=${mid}&key=579621905`,
      showLoading: true,
      fail: () => {},
      isSuccess: res => true,
    })

    return res
  } catch (e) {
    throw e
  }
}

const langDetect = async (value) => {
  const res = await promiseRequest({
    url: `${FANYI}/langdetect`,
    data: {
      query: value,
    },
    method: 'POST',
    showLoading: false,
    fail: () => {},
    isSuccess: res => res.error === 0,
  })

  return res
}

const getEleList = async (lat, long, offset) => {
  const res = await promiseRequest({
    url: `${ELE}/pizza/v1/restaurants`,
    data: {
      latitude: lat || 31.98193,
      longitude: long || 118.738491,
      offset: offset || 0,
      limit: 30,
      category_name: '美食',
      order_by: 0,
      extras: ['activities'],
      activity_types: [3],
      restaurant_category_ids: [209, 212, 213, 214, 215, 216, 217, 219, 265, 266, 267, 268, 269, 221, 222, 223, 224, 225, 226, 227, 228, 231, 232, 263, 218, 234, 236, 237, 238, 211, 229, 230, 264],
      restaurant_category_id: [209, 212, 213, 214, 215, 216, 217, 219, 265, 266, 267, 268, 269, 221, 222, 223, 224, 225, 226, 227, 228, 231, 232, 263, 218, 234, 236, 237, 238, 211, 229, 230, 264],
      category_schema: {
        'complex_category_ids': [209, 212, 213, 214, 215, 216, 217, 219, 265, 266, 267, 268, 269, 221, 222, 223, 224, 225, 226, 227, 228, 231, 232, 263, 218, 234, 236, 237, 238, 211, 229, 230, 264]
      },
      terminal: 'weapp',
      user_id: 56573132,
    },
    header: {
      cookie: 'USERID=5657313; SID=wENw0E5dBCKH10CcVHwbVGz1IpW3n8hm8GGg;'
    },
    showLoading: true,
    fail: () => {},
    isSuccess: res => true,
  })

  return res
}

export {
  getHotKey,
  getJitaHome,
  getJitaSinger,
  getJitaSong,
  searchJita,
  getMusicHome,
  getMusicTopList,
  getRainJoy1993Config,
  searchSong,
  getSongIrc,
  langDetect,
  getEleList,
}

export default {
  getHotKey,
  getJitaHome,
  getJitaSinger,
  getJitaSong,
  searchJita,
  getMusicHome,
  getMusicTopList,
  getRainJoy1993Config,
  searchSong,
  getSongIrc,
  langDetect,
  getEleList,
}

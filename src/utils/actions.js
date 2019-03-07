import { CYQQ, JITA, GITLAB } from './api'
import promiseRequest from './promiseRequest'

const getHotKey = async () => {
  try {
    const res = await promiseRequest({
      url: `${CYQQ}/splcloud/fcgi-bin/gethotkey.fcg?gformat=json`,
      showLoading: true,
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
export {
  getHotKey,
  getJitaHome,
  getJitaSinger,
  getJitaSong,
  searchJita,
  getMusicHome,
  getMusicTopList,
  getRainJoy1993Config,
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
}

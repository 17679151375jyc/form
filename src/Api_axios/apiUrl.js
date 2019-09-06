const BASE_API = 'http://172.31.1.238:8181/'
// const BASE_API = 'https://mhwx.cyjaf.cn/'
export default {
    // attendantList: BASE_API + '/family/server/applyInstall/getPackagePageInfo',
    // streetList: BASE_API +'/FamilyJava/client/com/street',
    // device: BASE_API + '/family/server/applyInstall/getDevicePageInfo',
    // combolContent: BASE_API + '/family/server/applyInstall/getPackage',
    // save: BASE_API + '/family/server/applyInstall/saveObj'
    addData: BASE_API + 'family/server/applyInstall/saveObj',//添加申请安装数据
    selList: BASE_API + 'family/server/applyInstall/getPackagePageInfo',//查询套餐列表
    xiangq: BASE_API + 'family/server/applyInstall/getPackage?',//获取套餐详情
    selShe: BASE_API + 'family/server/applyInstall/getDevicePageInfo'//查询设备列表
} 
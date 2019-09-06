<template>
  <div class="header-nav">
        <!-- 选项卡 -->
    <div class="nav-ul" id="tops">
    <!-- 选项卡菜单 -->
      <van-steps  :active = "num"  active-icon = "arrow"  active-color = "#3388ff" id='daoH'>
        <van-step><span class="dao_S" >用户资料</span></van-step>
        <van-step><span class="dao_S" >业务受理</span></van-step>
        <van-step><span class="dao_S" >安防硬件</span></van-step>
        <van-step><span class="dao_S" >增配硬件</span></van-step>
        <van-step><span class="dao_S" >完成</span></van-step>
      </van-steps>
           <!-- 选项卡菜单内容 -->
      <div class="content">
        <ul>                    
          <!-- （内容1）用户资料板块 -->
          <li v-if="num == 0">
            <div class="div_conts" :style="{'paddingBottom':padbm+'vw'}">
                      <!-- 开户人姓名 -->
              <div class="div-input">
                <label for="">开户人姓名</label>
                <van-field :error="errors.error1" @focus="huoqu(1)" @blur="shiqu(1)" v-model="yonghu.username" placeholder="请填写开户人姓名" input-align="right" class="input-style"/>
              </div>
                      <!-- 有效证件号码 -->
              <div class="div-input">
                <label for="">有效证件号码</label>
                <van-field :error="errors.error2" @focus="huoqu(2)" @blur="shiqu(2)" v-model="yonghu.zheng" placeholder="请填写有效证件号码" input-align="right" class="input-style"/>
              </div>
                    <!-- 销售渠道 -->
              <div class="div-input">
                <label for="">销售渠道</label>
                <div class="div_xial">
                  <img src="../assets/img/icon_down.png" class="img_div_x" @click="kuang(0)">
                  <van-field disabled :error="errors.error10" v-model="yonghu.xiaosqd" placeholder="请选择销售渠道" input-align="right" class="div_ipsl"/> 
                  <div  class="dai_ap" v-show="xian0">
                    <ul id='xial0'>
                      <li>穿云箭用户</li>
                      <li>广电用户</li>
                      </ul>
                  </div>
                </div>
              </div>
                      <!-- 安装地址 -->
              <div class="div-input">
                <label for="">安装地址</label>
                <img src="../assets/img/icon_down.png" @click="show = true">
                  <van-field disabled :error="errors.error3" v-model="yonghu.dizhi" placeholder="请选择安装地址" input-align="right" class="input-style2"/>                
              </div>

              <div class="div-input" v-if=" !yonghu.dizhi == ''">
                <label for="">街道</label>
                <img src="../assets/img/icon_down.png" @click="xian5 = true">
                  <van-field :error="errors.error16" disabled v-model="street" placeholder="请选择街道" input-align="right" class="input-style2"/>                
              </div>
                      <!-- 街道弹出框 -->
              <van-popup v-model="xian5" position="bottom">
                <van-picker
                  :columns="streetData"
                  @cancel='xian5=false'
                  show-toolbar
                  @confirm="onC"
                  title="选择街道"            
                />
               </van-popup>
                    <!-- 弹出的地址框 -->
                <van-popup v-model="show" position="bottom">
                  <van-area value="440703" :columns-num="3" :area-list="arealist" @confirm="queding" @cancel=" show=false " />
                </van-popup>
                      <!-- 门牌号 -->
              <div class="div-input">
                <van-field :error="errors.error4" @focus="huoqu(4)" @blur="shiqu(4)" v-model="yonghu.menpai" placeholder="请填写详细地址,具体到门牌号" input-align="right" class="input-style"/>
              </div>
                      <!-- 电视编号 -->
              <!-- <div class="div-input">
                <label for="">电视编号</label>
                <van-field :error="errors.error5" @focus="huoqu(5)" @blur="shiqu(5)" v-model="yonghu.dianshi" placeholder="请填写电视编号" input-align="right" class="input-style"/>
              </div> -->
                      <!-- 联系电话 -->
              <div class="div-input">
                <label for="">联系电话</label>
                <van-field :error="errors.error0" @focus="huoqu(0)" @blur="shiqu(0)" v-model="yonghu.dianhua" placeholder="请填写电话号码" input-align="right" class="input-style"/>
              </div>              
                      <!-- 代扣账户 -->
              <div class="div-input">
                <label for="">代扣账户</label>
                <div class="div_xial">
                  <img src="../assets/img/icon_down.png" class="img_div_x" @click="kuang(1)">
                  <van-field disabled :error="errors.error12" v-model="yonghu.daikou" placeholder="请选择代扣账户" input-align="right" class="div_ipsl"/> 
                  <div  class="dai_ap" v-show="xian1">
                    <ul id='xial'>
                      <li>新增/更改银行代扣费账户</li>
                      <li>使用原银行代扣费账户</li>
                      </ul>
                  </div>
                </div>
              </div>
                      <!-- 银行名称 -->
              <div class="div-input">
                <label for="">银行名称</label>
                <van-field :error="errors.error6" @focus="huoqu(6)" @blur="shiqu(6)" v-model="yonghu.yinhang" placeholder="请填写银行名称" input-align="right" class="input-style"/>
              </div>
                      <!-- 户名 -->
              <div class="div-input">
                <label for="">户名</label>
                <van-field :error="errors.error7" @focus="huoqu(7)" @blur="shiqu(7)" v-model="yonghu.huname" placeholder="请填写户名" input-align="right" class="input-style"/>
              </div>
                      <!-- 账号 -->
              <div class="div-input">
                <label for="">账号</label>
                <van-field :error="errors.error8" @focus="huoqu(8)" @blur="shiqu(8)" v-model="yonghu.zhanghao" placeholder="请填写账号" input-align="right" class="input-style"/>
              </div>
            </div>
          </li>
          <!-- （内容2）业务受理板块 -->
          <li v-if="num == 1">
            <div class="div_conts"  :style="{'paddingBottom':padbm + 'vw'}">
                  <!-- 套餐类型 -->
              <div>
              <div class="div-input">
                <label for="">套餐类型</label>
                <div class="div_xial">
                  <img src="../assets/img/icon_down.png" class="img_div_x" @click="kuang(2)">
                  <van-field disabled :error="errors.error13" v-model="yewu.taocan" placeholder="请选择套餐类型" input-align="right" class="div_ipsl"/> 
                  <div  class="dai_ap" v-show="xian2">
                    <ul id='xial2' v-for="(item,key) in listT">
                      <li @click="rifHo(key)">{{item.name}}</li>
                    </ul>
                  </div>
                </div>
              </div>
                    <!-- 文本框 -->
              <div class="Text_Area">
                <textarea readonly class="textarea_cont"  v-model='text1'></textarea>
                <span><a @click="show_a = true">查看详情</a></span>
              </div>

              <van-popup v-model="show_a">
                <div class="Icon_x"><van-icon name="cross" @click="show_a = false" class="Icon_x" size="22pt"/></div>
                <h3>{{yewu.taocan}}</h3>
                <div class="tan_cont">
                  <textarea readonly class="textarea_xq" v-model='text1'></textarea>
                </div>
              </van-popup>              
              </div>
                    <!-- 办理业务 -->
              <div class="div-input">
                <label for="">办理业务</label>
                <div class="div_xial">
                  <img src="../assets/img/icon_down.png" class="img_div_x" @click="kuang(3)">
                  <van-field disabled :error="errors.error14" v-model="yewu.banli" placeholder="请选择办理业务" input-align="right" class="div_ipsl"/> 
                  <div  class="dai_ap" v-show="xian3">
                    <ul id='xial3'>
                      <li>家庭网关+安防设备</li>
                      <li>加装安防设备</li>
                      </ul>
                  </div>
                </div>
              </div>
                    <!-- 业务员 -->
              <div class="div-input">
                <label for="">业务员</label>
                <van-field :error="errors.error9" @focus="huoqu(9)" @blur="shiqu(9)"  v-model="yewu.yewuyuan" placeholder="请填写业务员编号" input-align="right" class="input-style"/>
              </div>
                    <!-- 收款类型 -->
              <div class="div-input">
                <label for="">收款类型</label>
                <div class="div_xial">
                  <img src="../assets/img/icon_down.png" class="img_div_x" @click="kuang(4)">
                  <van-field disabled :error="errors.error15" v-model="yewu.shoukuan" placeholder="请选择收款类型" input-align="right" class="div_ipsl"/> 
                  <div  class="dai_ap" v-show="xian4">
                    <ul id='xial4'>
                      <li>押金</li>
                      <li>购销</li>
                      <li>押金+增配购销</li>
                      </ul>
                  </div>
                </div>
              </div>
                    <!-- 开具发票金额 -->
              <div class="div-input">
                <label for="">开具发票金额</label>
                <van-field :error="errors.error11" @focus="huoqu(11)" @blur="shiqu(11)"  v-model="yewu.fapiaojin" placeholder="请填写开具发票金额" input-align="right" class="input-style"/>
              </div>
                    <!-- 发票抬头 -->
              <div class="div-input">
                <label for="">发票抬头</label>
                <van-field v-model="yewu.taitou" placeholder="请填写发票抬头（选填）" input-align="right" class="input-style"/>
              </div>
                    <!-- 备注 -->
              <div class="div-input">
                <label for="">备注</label>
                <van-field v-model="yewu.beizhu" placeholder="请填写备注（选填）" input-align="right" class="input-style"/>
              </div>
            </div>
          </li>
          <!-- （内容3）安防硬件板块 -->
          <li v-if="num==2">
            <div class="form_list">
              <ul>
                <li>
                  <span>{{Tcxq}}</span>
                  <span>￥{{taocanJia | formatDates}}</span>
                  <div><p>{{taocanT}}</p></div>
                </li>
                <li v-for='item in list'>
                  <span>{{item.name}}</span>
                  <span>x{{item.num}}</span>
                  <span>￥{{item.price | formatDates}}</span>
                </li>
              </ul>
            </div>
                  <!-- 累计总数模块 -->
            <div class="nums"><span class="zengall">数量 : {{ anfNum() }} </span><span class="zengP">合计 : ￥{{ anfPri() | formatDates }}</span></div>
          </li>
          <!-- （内容4）增配硬件板块 -->
          <li v-if="num==3">
              <div class="gouwu">
                <ul>
                  <li v-for="items in list_zeng">
                    <span class="span_name">{{ items.name }}</span>
                    <span class="span_Price">￥{{ items.price| formatDates }}</span>
                    <div class="div_jia">
                      <div>
                        <img src="../assets/img/icon_subtract_none.png" v-if="items.num<=0">
                        <img src="../assets/img/icon_subtract_to.png" v-if="items.num>=1" @click="items.num--">
                      </div>
                      <div>
                        <img src="../assets/img/icon_add_to.png" @click="items.num++">
                      </div>
                      <span>{{ items.num }}</span>
                    </div>
                  </li>
                </ul>
              </div>
            <div class="nums"><span class="zengall">数量 : {{ zengNum() }} </span><span class="zengP">合计 : {{ zengPri() | formatDates }}</span></div>
          </li>
          <!-- （内容5）完成页面板块 -->
          <li v-if="num==4">
            <div class="div_conts"  :style="{'paddingBottom':'40vw'}">
                  <!-- 用户资料 -->
              <div class="xinxi">
                <h3>用户资料</h3>
                <ul class="xinxi_lieb">
                  <li>开户人姓名<span>{{ yonghu.username }}</span></li>
                  <li>有效证件号码<span>{{ yonghu.zheng }}</span></li>
                  <li>销售渠道<span>{{ yonghu.xiaosqd }}</span></li>
                  <li>安装地址<span>{{ yonghu.dizhi }}</span></li>
                        <li><span>{{ yonghu.menpai }}</span></li>
                  <!-- <li>电视编号<span>{{ yonghu.dianshi }}</span></li> -->
                  <li>联系电话<span>{{ yonghu.dianhua }}</span></li>
                  <li>代扣费账户<span>{{ yonghu.daikou }}</span></li>
                  <li>银行名称<span>{{ yonghu.yinhang }}</span></li>
                  <li>户名<span>{{ yonghu.huname }}</span></li>
                  <li>账号<span>{{ yonghu.zhanghao }}</span></li>
                </ul>
              </div>
                    <!-- 业务办理 -->
              <div class="xinxi">
                <h3>业务办理</h3>
                <ul class="xinxi_lieb">
                  <li>套餐类型<span>{{ yewu.taocan }}</span></li>
                  <li>办理业务<span>{{ yewu.banli }}</span></li>
                  <li>业务员<span>{{ yewu.yewuyuan }}</span></li>
                  <li>收款类型<span>{{ yewu.shoukuan }}</span></li>
                  <li>开具发票金额<span>{{ yewu.fapiaojin | formatDates }}</span></li>
                  <li>发票抬头<span>{{ yewu.taitou }}</span></li>
                  <li>备注<span>{{ yewu.beizhu }}</span></li>
                </ul>
              </div>
                    <!-- 安防硬件 -->
              <div class="xinxi">
                <h3>安防硬件</h3>
                <ul class="xinxi_lieb" v-for="item2 in list">
                  <li>{{item2.name}}<p style="color:#ff3333;">{{ item2.price | formatDates }}</p><p class="anfang_num">x{{ item2.num }}</p></li>

                </ul>
                <div  class="hang_jisuan"><b>合计：</b><span style="color:#ff3333;float:right;">￥{{ anfPri() | formatDates }}</span></div>
              </div>
                    <!-- 增配硬件 -->
              <div class="xinxi">
                <h3>增配硬件</h3>
                <ul class="xinxi_lieb" v-for="item3 in list_zeng">
                  <li v-if="item3.num!==0">{{ item3.name }}
                    <p style="color:#ff3333;">{{ item3.price | formatDates }}</p>
                    <p class="anfang_num">x{{ item3.num }}</p>
                  </li>
                </ul>
                <div class="hang_jisuan"><b>合计:</b><span style="color:#ff3333;float:right;">￥{{ zengPri() | formatDates }}</span></div>
              </div>
                    <!-- 合计费用 -->
              <div class="xinxi">
                <h3 class="heji">合计费用：</h3>
                <span class="heji_zongjia">￥{{ ZongPrice() | formatDates }}</span>
              </div>
            </div>
          </li>          
        </ul>
      </div>
    </div>
    <!-- 底部按钮 -->
    <div class="dibu" v-if="buts">
      <van-button type="info" size="large" class="button1" v-if="num==0" text="下一步" @click="Click_xia()"></van-button>
      <van-button type="default" class="button2" v-if="!num==0" text="返回上一步" @click="Click_shang()"></van-button>
      <van-button type="info" size="normal" v-if="num==1||num==2||num==3" class="button3" text="下一步" @click="Click_xia()"></van-button>
      <van-button type="info" :disabled="disabled" size="normal" v-if="num==4" class="button3" text="确定上传" @click="upload()"></van-button>
    </div>
  </div>     
</template>
<script>
import Area from 'vant/packages/area/demo/area.js'
import api from '../Api_axios/apiUrl'
export default {
  data() {
    return {   
      disabled:false,
      list_zeng:[],// 增配硬件列表
      list:[],  // 安防硬件列表 

      AnNum:null,//安防硬件配件总数量
      AnPrice:null,//安防硬件配件总价格
      Tcxq:'',//套餐列表里的套餐名字
      taocanJia:'',//套餐列表里的套餐价格
      taocanT:'',//套餐列表里的套餐文本
      listT:null,//获取套餐列表（给一个空数组）
      taocanId:'',//套餐列表里的套餐id
      saleChannel:null,//销售渠道类型
      withholdAccountType:null,//代扣类型
      businessType:null,//业务办理类型
      settleAccountsType:null,//收款类型

      province: "",//省
      city: "",//市
      area: "",//区
      street:null,//街道
      streetData: [],//存街道的数组
      // 页面
      num: 0,  
      xian0:false,//销售渠道框的显示与隐藏
      xian1:false,//代扣账户框的显示与隐藏
      xian2:false,//套餐类型的显示与隐藏
      xian3:false,//办理业务的显示与隐藏
      xian4:false,//收款类型的显示与隐藏
      show_a: false,//套餐查看详情框
      show_textarea: 0,//套餐详情弹出框里的内容（0为默认内容）
      show: false,// 地址弹出框的显示   
      xian5:false, // 街道弹出框的显示 
      arealist: Area,// 接受地址JSON数据    
      qudao: false,// 控制销售渠道弹出框显示
      yhname: '',//销售渠道弹出框里的input值    
      sc_n: false,//姓名失去焦点时返回一个状态
      sc_s: false,//身份证失去焦点时返回一个状态
      sc_d: false,//电话号码失去焦点时返回一个状态
      sc_fp: false,//发票金额失去焦点时返回一个状态
      maxNum:0,//下一步后之前那步可点击
      text1: "",//套餐文本介绍
      errors:{//警示
        error1: false,//开户人姓名
        error2: false,//身份证
        error10: false,//销售渠道
        error3: false,//地址
        error16: false,//街道
        error4: false,//门牌号
        error5: false,//电视编号
        error0: false,//电话
        error12:false,//代扣账户
        error6: false,//银行
        error7: false,//户名
        error8: false,//账号
        error9: false,//业务员
        error11: false,//发票金额
        error13: false,//套餐类型
        error14: false,//业务办理
        error15: false//收款类型
      },
      // 用户资料信息  
      yonghu:{
          username: '',// 开户人姓名
          zheng: '',// 证件号     
          xiaosqd: '',//销售渠道  
          dizhi: '',//地址
          menpai: '',//门牌号
          // dianshi: '', // 电视编号   
          dianhua: '', // 电话号码    
          daikou: '',//代扣账户 
          yinhang: '',// 银行名称    
          huname: '',// 户名      
          zhanghao: ''// 账号
      },
      // 业务受理信息
      yewu:{
        taocan: '',//套餐类型
        banli: '',//办理业务
        yewuyuan: '',//业务员
        shoukuan: '',//收款类型
        fapiaojin: '',//开具发票金额
        taitou: '',
        beizhu: ''//备注
      },      
      buts: true,//底部按钮状态
      padbm: 40,//页面padding_bottom的值
    }
  },
  filters:{
    // 过滤价格保留两位小数
    formatDates:(value) => {
      return  (value*1).toFixed(2);
    }
  },
  watch:{

  },
  methods:{  
    // 获取套餐
    taoCanList(){
      this.$axios.post(api.selList,{
        input: {
          saleChannel:this.saleChannel
        },
        page: 1,
        pageSize: 10
      },{
        headers: {
          'Content-Type': 'application/json;charset=UTF-8'
        }
      })
      .then((res)=>{
        if( res && res.data && res.data.errorCode === 0 &&
          res.data.data){
          this.listT = JSON.parse(res.request.response).data.list;
          this.yewu.taocan = this.listT[0].name;
          this.text1 = this.listT[0].remark;
          this.taocanId = this.listT[0].id;
        }
      })
    },  
    // 点击套餐相应内容变化
    rifHo(n){
      this.yewu.taocan = this.listT[n].name;
      this.taocanId = this.listT[n].id;
      this.xian2 = false;
      this.text1 = this.listT[n].remark;
      this.errors.error13 = false;
    },
    //获取安防硬件套餐详情
    anList(){
      this.$axios.post(api.xiangq +  `id=${this.taocanId}`).then( res=>{
        if( res && res.data && res.data.errorCode === 0 &&
          res.data.data ){
            this.Tcxq = res.data.data.name;
            this.taocanJia = res.data.data.price;
            this.taocanT = res.data.data.remark
            this.list = res.data.data.applyDevices
        }
      })
    },
    //获取增配硬件
    zengList(){
      this.$axios.post(api.selShe,{
        input: {          
          saleChannel:this.saleChannel
        },
        page: 1,
        pageSize: 50
      },{
        headers: {
          'Content-Type': 'application/json;charset=UTF-8'
        }
      })
      .then(res=>{
        if( res && res.data && res.data.errorCode === 0 &&
          res.data.data.list){
          for(let item of res.data.data.list){
            if(!item.num){
              Object.assign(item, {num:0})
            }
          }
          this.list_zeng = res.data.data.list;
        }
      })
    },
    //确定上传
    getAttendant(){
      let list_zeng = this.list_zeng.filter(function(item, index, list_zeng){
        return item.num!==0;
      })
      this.$axios.post(api.addData,{
        "name": this.yonghu.username,// 开户人姓名
        "credentialNo": this.yonghu.zheng,//证件号
        "detailedAddress": this.yonghu.menpei,//门牌号(详细地址)
        "province": this.province,//省
        "city": this.city,//市
        "area": this.area,//区
        "street": this.street,//街道
        // "tvNo": this.yonghu.dianshi,//电视编号
        "contactPhone": this.yonghu.dianhua,//电话
        "withholdAccountType": this.withholdAccountType,//代扣类型 1.新增/更改帐号 2.使用原帐号
        "bankName": this.yonghu.yinhang,//银行名称
        "bankAccountName": this.yonghu.huname,//户名
        "bankAccountNo": this.yonghu.zhanghao,//账号
        "businessType": this.businessType,//业务类型 1家庭网关+安防设备 2 加装安防
        "businessNo": this.yewu.yewuyuan,// 业务员编号
        "saleChannel": this.saleChannel,//销售渠道  1穿云箭,2广电
        "settleAccountsType": this.settleAccountsType, //收款类型1.押金 2购销 3押金+增配购销
        "invoiceAmount": this.yewu.fapiaojin, //发票金额
        "taitou":this.yewu.taitou,
        "beizhu": this.yewu.beizhu,//备注
        "applyDevices": list_zeng
      },{
        headers: {
          'Content-Type': 'application/json;charset=UTF-8'
        }
      }).then(res=>{   
        console.log(res);
        if( res && res.data && res.data.errorCode === 0){
            alert('申请已提交！')
            this.disabled = true;
        }else{
          alert('提交发生错误！')
        }
      })
    },
    // 点击出现下拉框
    kuang(m){
      switch(m){
        case 0:
          this.xian0 = !this.xian0;
          let xial0 = document.getElementById('xial0').getElementsByTagName('li')
          for(let i = 0; i<xial0.length; i++){
            ((n) => {
              xial0[n].onclick = () => {
                this.yonghu.xiaosqd = xial0[n].innerText
                this.errors.error10 = false;
                this.xian0 = false;
                this.saleChannel = (n+1).toString();
              }
            })(i)
          } 
          break;
        case 1:
          this.xian1 = !this.xian1;
          let xial1 = document.getElementById('xial').getElementsByTagName('li')
          for(let i = 0; i<xial1.length; i++){
            ((n) => {
              xial1[n].onclick = () => {
                this.yonghu.daikou = xial1[n].innerText
                this.errors.error12 = false;
                this.xian1 = false;
                this.withholdAccountType = (n+1).toString();
              }
            })(i)
          }
          break;
        case 2:
          this.xian2 = !this.xian2;
          break;
        case 3:
          this.xian3 = !this.xian3;
          let xial3 = document.getElementById('xial3').getElementsByTagName('li')
          for(let i = 0; i<xial3.length; i++){
            ((n) => {
              xial3[n].onclick = () => {
                this.yewu.banli = xial3[n].innerText
                this.errors.error14 = false;
                this.xian3 = false;
                this.businessType = (n+1).toString();
              }
            })(i)
          }
          break;
        case 4:
          this.xian4 = !this.xian4;
          let xial4 = document.getElementById('xial4').getElementsByTagName('li')
          for(let i = 0; i<xial4.length; i++){
            ((n) => {
              xial4[n].onclick = () => {
                this.yewu.shoukuan = xial4[n].innerText
                this.errors.error15 = false;
                this.xian4 = false;
                this.settleAccountsType = (n+1).toString();
              }
            })(i)
          }
          break;
      }
    },
    // 点击确定地址
    queding(val) {
      this.errors.error3 = false;
      this.show = false;
      this.province = val[0].name,
      this.city = val[1].name,
      this.area = val[2].name
      this.yonghu.dizhi = this.province + '-' + this.city + '-' + this.area;
      this.getStreet(val[2]["code"]);
      this.xian5 = true;
    },
    // 街道
    getStreet(id) {
      this.streetData = [];
      this.$axios
        .post('http://172.31.1.238:8181/FamilyJava/client/com/street', {
          timestamp: Math.round(new Date().getTime() / 1000),
          areaId: id
        },{
          headers: {
             'Content-Type': 'application/x-www-form-urlencoded'
           }
        })
        .then(response => {
          console.log(response)
          if (
            response &&
            response.data &&
            response.data.errorCode === 0 &&
            response.data.data
          ) {
            response.data.data.list.forEach(item => {
              this.streetData.push(item.name);
            });
          }
        })
    },
    // 街道确认
    onC(e){
      this.errors.error16 = false;
      this.street = e ;
      this.xian5 = false;
    },
        //安防硬件数量及价格总计
    anfNum() {
        let num = 0;
        for (let item of this.list) {
          num += item.num 
        }        
        return num;
    },
    anfPri(){
      let jia = 0;
      for (let item of this.list) {
        jia += item.price
      }        
      return jia;
    },
    //增配硬件数量及价格总计
    zengNum() {
        let num = 0;
        for (let item of this.list_zeng) {
          num += item.num 
        }        
        return num;
    },
    zengPri(){
      let jia = 0;
      for (let item of this.list_zeng) {
        jia += item.price*item.num
      }        
      return jia;
    },
    ZongPrice(){
       return this.anfPri() + this.zengPri();
    },
    // 获取输入框焦点
    huoqu(m) {
      switch(m) {
        case 0:
          if( this.errors.error0 == true ){
            this.yonghu.dianhua = "";
            this.errors.error0 = false;
          }
          break;
        case 1:
          if( this.errors.error1 !== false ){
            this.yonghu.username = "";
            this.errors.error1 = false;
          }
          break;
        case 2:
          if( this.errors.error2 == true ){
            this.yonghu.zheng = "";
            this.errors.error2 = false;
          }
          if( this.errors.error2 !== false ){
            this.errors.error2 = false;
          }
          break;
        case 4:
          if( this.errors.error4 !== false ){
            this.errors.error4 = false;          
          }
          break;
        case 5:
          if( this.errors.error5 !== false ){
            this.errors.error5 = false;          
          }
          break;
        case 6:
          if( this.errors.error6 !== false ){
            this.errors.error6 = false;
          }
          break;
        case 7:
          if( this.errors.error7 !== false ){
            this.errors.error7 = false;
          }
          break;
        case 8:
          if( this.errors.error8 !== false ){
            this.errors.error8 = false;
          }
          break;
        case 9:
          if( this.errors.error9 !== false ){
            this.errors.error9 = false;
          }
          break;
        case 11:
          if( this.errors.error11 == true ){
            this.yewu.fapiaojin = "";
            this.errors.error11 = false;
          }
          break;
      }
    },
    // 失去焦点判定
    shiqu(m){      
      switch(m){
        case 0:
          if( this.yonghu.dianhua == "" ){
            this.errors.error0 = true
          }else{
            var reg = /^1([38][0-9]|4[579]|5[0-3,5-9]|6[6]|7[0135678]|9[89])\d{8}$/;
            if( reg.test(this.yonghu.dianhua) ){
              this.errors.error0 = false;
              this.sc_d = true;
            }else{
              this.errors.error0 = true;
              this.yonghu.dianhua = "电话格式错误";
              this.sc_d = false;
            }
          }
          break;
        case 1:
          if( this.yonghu.username == "" ){
            this.errors.error1 = true;
          }else{
            var reg = /^(?:[\u4e00-\u9fa5]+)(?:·[\u4e00-\u9fa5]+)*$|^[a-zA-Z0-9]+\s?[\.·\-()a-zA-Z]*[a-zA-Z]+$/;
            if( reg.test(this.yonghu.username) ){
              this.errors.error1 = false;
              this.sc_n = true;
            }else{
              this.errors.error1 = true;
              this.yonghu.username = "请输入正确的姓名";
              this.sc_n = false;
            }
          }
          break;
        case 2:
          if( this.yonghu.zheng == "" ){
            this.errors.error2 = true
          }else{
            var reg = /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/;
            if( reg.test(this.yonghu.zheng) ){
              this.errors.error2 = false;
              this.sc_s = true;
            }else{
              this.errors.error2 = true;
              this.yonghu.zheng = "证件号格式错误";
              this.sc_s = false;
            }
          }
          break;
        case 4:
          if( this.yonghu.menpai == "" ){
            this.errors.error4 = true;
          }
          break;
        // case 5:
        //   if( this.yonghu.dianshi == "" ){
        //     this.errors.error5 = true
        //   }
        //   break;
        case 6:
          if( this.yonghu.yinhang=="" ){
            this.errors.error6 = true;
          }
          break;
        case 7:
          if( this.yonghu.huname == "" ){
            this.errors.error7 = true;
          }
          break;
        case 8:
          if( this.yonghu.zhanghao == "" ){
            this.errors.error8 = true;
          }
          break;
        case 9:
          if( this.yewu.yewuyuan == "" ){
            this.errors.error9 = true;
          }
          break;
        case 11:
          if( this.yewu.fapiaojin == '' ){
            this.errors.error11 = true;
          }else{
            var reg = /^\d*\.{0,1}\d{0,1}$/;
            if( reg.test(this.yewu.fapiaojin) ){
              this.errors.error11 = false;
              this.sc_fp = true;
            }else{
              this.errors.error11 = true;
              this.yewu.fapiaojin = "请输入有效金额";
              this.sc_fp = false;
            }
          }
          break;
      }
    },
    // 上一步按钮
    Click_shang() {
      if( this.num !== 0 ) this.num = this.num - 1 ;
      if( this.num == 1 ){
        if( this.yewu.beizhu == "/" ){ this.yewu.beizhu = '' }
        if( this.yewu.taitou == "/" ){ this.yewu.taitou = '' }
      }
    },
    // 页面到顶端的函数
    top() {
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
    },
    // 下一步按钮
    Click_xia() { 
      switch( this.num ){
        case 0://用户资料下一步按钮
          // 做input满足相应条件则跳转到下一个页面
          if( this.sc_n == true && this.sc_s == true  && this.yonghu.xiaosqd !== ''&& 
            this.yonghu.dizhi !== '' && this.yonghu.menpai !== '' &&
            // this.yonghu.dianshi !== '' &&
            this.sc_d == true &&
            this.yonghu.yinhang !== ""&&
            this.yonghu.huname !== "" && this.yonghu.zhanghao !== "" ){
          // if(true){
            this.num = this.num + 1;            
            this.maxNum = this.num;
            this.top();
            this.taoCanList();
          }else{// 点击下一步input为空时显示提示  
            this.maxNUm = 0;   
            if( this.yonghu.username == "" ){ this.errors.error1 = true }
            if( this.yonghu.zheng == ""){ this.errors.error2 = true }
            if( this.yonghu.xiaosqd == ""){ this.errors.error10 = true }
            if(this.street == ''){this.errors.error16 = true}
            if( this.yonghu.dizhi == ""){ this.errors.error3 = true }
            if( this.yonghu.menpai == "" ){ this.errors.error4 = true }
            // if( this.yonghu.dianshi == ""){ this.errors.error5 = true }
            if( this.yonghu.dianhua == ""){ this.errors.error0 = true }
            if( this.yonghu.daikou == ""){ this.errors.error12 = true }
            if( this.yonghu.yinhang == ""){ this.errors.error6 = true }
            if( this.yonghu.huname == ""){ this.errors.error7 = true }
            if( this.yonghu.zhanghao == "" ){this.errors.error8 = true;              
              document.body.scrollTop = 340;
              document.documentElement.scrollTop = 340;
            }
          }
          break;
        case 1://业务受理下一步按钮
          // 做input满足相应条件则跳转到下一个页面
          if( this.yewu.taocan !=='' && this.yewu.banli !=='' &&
            this.yewu.yewuyuan !== "" &&  this.yewu.shoukuan !== '' && this.sc_fp == true ){
            // if(true){
              this.num = this.num + 1;                       
              this.maxNum = this.num;
              this.top();   
              if(this.list){
                this.anList();  
              }  
            if( this.yewu.beizhu == ''){ this.yewu.beizhu = "/" }
            if( this.yewu.taitou == ''){ this.yewu.taitou = "/" }
          }else{
            this.maxNum = 1;
            if( this.yewu.yewuyuan == ''){ this.errors.error9 = true }
            if( this.yewu.taocan == '' ){ this.errors.error13 = true }
            if( this.yewu.banli == '' ){ this.errors.error14 = true }
            if( this.yewu.yewuyuan == '' ){ this.errors.error9 = true }
            if( this.yewu.shoukuan == '' ){ this.errors.error15 = true }
            if( this.yewu.fapiaojin == '' ){ this.errors.error11 = true }          
          }
          break;
        case 2://安防硬件下一步按钮
          this.num = this.num + 1;    
          this.maxNum = this.num;
          this.top();     
          this.zengList();
          document.body.scrollTop = 0;
          document.documentElement.scrollTop = 0;
          break;
        case 3://增配硬件下一步按钮
          this.num = this.num + 1;
          this.maxNum = this.num;
          this.top()
          break;
      }
    },
    upload(){       
      this.getAttendant() 
    }
  },
  mounted(){
    let sp = document.getElementById('tops').getElementsByClassName('dao_S');
    for(let i=0; i<sp.length; i++){
      ((n) => {
        sp[n].onclick = () => {
          let Max = this.maxNum;
          if(n <= Max)this.num = n 
        }
      })(i)
    }
    let Bheight = document.documentElement.clientHeight;
    window.onresize = () => {//监听屏幕高度变化，控制底部按钮的显示与隐藏
      if( Bheight > document.documentElement.clientHeight ){
         this.buts = false;
         this.padbm = 15;
      }else{
         this.buts = true;
         this.padbm = 40;
      }
    }
  }
}
</script>
<style>
</style>
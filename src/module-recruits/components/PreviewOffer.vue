<template>
  <div class="PreviewOffer">
    <!--以下是模板内容 - 请复制在itcast中直接使用-->
    <table style="line-height: 40px; padding: 20px;">
      <tr><td style="font-size: 18px;font-weight: bold">尊敬的 XXX：</td></tr>
      <tr>
        <td style="line-height: 24px;">
          非常荣幸地通知您，您已被我司正式录用，「岗位名称」 一职。真诚欢迎您的加入，并诚意地邀请您根据下述内容准时到公司报到。
        </td>
      </tr>
      <tr><td style="width: 90px; font-weight: bold;">一、报到事宜</td></tr>
      <tr>
        <td>
          <table style="width: 100%;line-height: 24px;">
            <tr><td style="width: 60px; font-weight: bold;">时 间：</td><td>{{dataes.reportingTime}}</td></tr>
            <tr><td style="font-weight: bold;">地 点：</td><td>{{dataes.companyAddress}}</td></tr>
            <tr><td style="font-weight: bold;">联系人：</td><td>{{dataes.entryContact}}</td></tr>
            <tr><td style="font-weight: bold;">联系电话：</td><td>{{dataes.contactTelephone}}</td></tr>
          </table>
        </td>
      </tr>
      <tr><td style="width: 90px; font-weight: bold;">二、携带资料</td></tr>
      <tr>
        <td>
          <table style="width: 100%; line-height: 24px">
            <tr><td>失业证或与原单位解除劳动合同的证明材料原件；</td></tr>
            <tr><td>入职通知书；</td></tr>
            <tr><td>身份证；</td></tr>
            <tr><td>最高学历证明原件；</td></tr>
            <tr><td>其他相关学历证明；</td></tr>
            <tr><td>一寸彩色免冠近期照片两张。</td></tr>
          </table>
        </td>
      </tr>
      <tr><td style="width: 90px; font-weight: bold;">三、聘用条款</td></tr>
      <tr>
        <td>
          <table style="width: 100%; line-height: 24px">
            <tr><td style="width: 100px; font-weight: bold;">试用期限：</td><td> {{dataes.probationPeriod}}</td></tr>
            <tr><td style="font-weight: bold;">薪  资：</td><td> {{dataes.salary}}</td></tr>
            <tr><td style="font-weight: bold;">其他奖金福利：</td><td>{{dataes.otherBenefits}} </td></tr>
          </table>
        </td>
      </tr>
      <tr><td style="width: 90px; font-weight: bold;">四、说明</td></tr>
      <tr>
        <td style=" line-height: 24px">
          接受该入职邀请视为您同意承诺如下：入职前已与原工作单位解除劳动合同，并不再承担竞业禁止等相关责任；如您与原工作单位发生劳动纠纷，由您个人承担全部责任。
          请您理解，此通知书具体内容为保密信息，将邀请内容披露给第三方均会导致邀请自动失效，无论您是否接受此邀请。
        </td>
      </tr>
      <tr><td>请在 10 个自然日内回复是否接受该入职邀请，否则视为放弃，我们期待您的加入。</td></tr>
      <tr><td style="width: 90px; font-weight: bold;">五、附件无</td></tr>
      <tr>
        <td style="text-align: center;">
          <input type="submit" style="background: rgba(255,0,0,0.8);border-radius:5px;margin:0 10px;padding: 8px 20px;color:#fff;border:none;" value="接受 offer">
          <input type="submit" style="background: rgba(0,0,255,0.73);border-radius:5px;margin:0 10px;padding: 8px 20px;color:#fff;border:none;" value="拒绝 offer">
        </td>
      </tr>
    </table>
    <!--模板内容 - end-->
  </div>
</template>
<script>
  export default {
    name: 'recruits-table-index',
    props: ['dataes'],
    data() {
      return {

      }
    }
  }
</script>
<style>
  .PreviewOffer{
    background: #fff;
    margin: 20px;
  }
</style>

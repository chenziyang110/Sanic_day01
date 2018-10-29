<template>
  <div class="mailTemplate">
      <!--以下是模板内容 - 请复制在itcast中直接使用-->
        <table style="line-height: 40px; padding: 20px;">
          <tr><td style="font-size: 18px;font-weight: bold">尊敬的 XXX：</td></tr>
          <tr>
            <td>
            您好，很高兴与您沟通， 经过我们仔细查看您的简历，您已通过职位 「职位名称」  的面试筛选，期待 『面试时间』 与您的面谈。请携带 简历 和 黑色签字笔，谢谢～
            您好，很高兴与您沟通， 经过我们仔细查看您的简历，您已通过职位 「职位名称」  的面试筛选，期待 『面试时间』 与您的面谈。请携带 简历 和 黑色签字笔，谢谢～
            您好，很高兴与您沟通， 经过我们仔细查看您的简历，您已通过职位 「职位名称」  的面试筛选，期待 『面试时间』 与您的面谈。请携带 简历 和 黑色签字笔，谢谢～
            您好，很高兴与您沟通， 经过我们仔细查看您的简历，您已通过职位 「职位名称」  的面试筛选，期待 『面试时间』 与您的面谈。请携带 简历 和 黑色签字笔，谢谢～
            </td>
          </tr>
          <tr><td style="width: 90px; font-weight: bold;">请收到回复，如果有变动请提前通知。</td></tr>
          <tr>
            <td>
              <table style="width: 100%;">
                <tr><td style="width: 90px; font-weight: bold;">公司联系人：</td><td>XXX</td></tr>
                <tr><td style="width: 90px; font-weight: bold;">联系人电话：</td><td>15826352736</td></tr>
                <tr><td style="width: 90px; font-weight: bold;">地  址：</td><td>北京市回龙观金燕龙大厦</td></tr>
              </table>
            </td>
          </tr>
          <tr>
            <td style="text-align: center;">
              <input type="submit" style="background: rgba(255,0,0,0.8);border-radius:5px;margin:0 10px;padding: 8px 20px;color:#fff;border:none;" value="接受面试">
              <input type="submit" style="background: rgba(0,0,255,0.73);border-radius:5px;margin:0 10px;padding: 8px 20px;color:#fff;border:none;" value="拒绝面试">
            </td>
          </tr>
        </table>
      <!--模板内容 - end-->
  </div>
</template>
<script>
  export default {
    name: 'recruits-table-index',
    components: {},
    data() {
      return {

      }
    }
  }
</script>
<style>
  .mailTemplate{
    background: #fff;
    margin: 20px;
  }
</style>

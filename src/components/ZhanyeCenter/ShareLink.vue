<template>
  <div class="share-link">
    <div class="share-link__block" v-for="share in shareList" @click="shareToFriend(share.shareID)">
      <div class="share-link__block_title">
        {{share.shareName}}
      </div>
      <div class="share-link__block_label red" v-if="share.shareType === 1">官方活动</div>
      <div class="share-link__block_label yellowish" v-if="share.shareType === 2">机构活动</div>
      <div class="share-link__block_content">
        <div class="share-link__block_img">
          <img :src="share.shareIcon" />
        </div>
        <div class="share-link__block_desc">{{share.shareContent}}</div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        userName: '',
        userIdForReal: '',
        userIdForActivity: '',
        activityID: '',
        shareList: []
      }
    },
    mounted () {
      // 获取用户userID
      this._getUserInfo(this, (response) => {
        let systemUrl = this.systemUrl
        this.userName = response.userNameTitle
        this.userIdForReal = response.userId
        this.userIdForActivity = response.userIdForActivity
        // 获取推广列表
        this._post(this, {SERVERID: 'WXFX002', OPT: 'QUERY', 'USER_ID': this.userIdForReal, SYSTEMID: '88888'}, (response) => {
          let shareData = []
          for (let share of response.rows) {
            let item = {
              shareName: share.TITLE,           // 标题
              shareContent: share.CONTENT,      // 内容
              shareIcon: systemUrl + share.IMGURL,          // 图标图片
              shareID: share.ID,                 // 分享ID
              shareType: share.ACTIVE_TYPE       // 分享L类型   1 官方活动  2.机构活动
            }
            shareData.push(item)
          }
          this.shareList = shareData
        })

        // 获取activity id
        this._post(this, {SERVERID: 60000017, 'APPLICATION_SENSE': 2}, (response) => {
          if (response.rows) {
            this.activityID = response.rows[0].ACTIVITE_ID
          }
        })
      })
    },
    methods: {
      shareToFriend (id) {
        this._post(this, {SERVERID: 'WXFX002', OPT: 'QUERYBYID', 'USER_ID': this.userIdForReal, ID: id, SYSTEMID: '88888'}, (response) => {
          // console.log(response)
          let shareInfo = response.shareTemplate
          let goLink
          if (this.activityID) {
            if (shareInfo.URL.split('#/')[1]) {
              goLink = shareInfo.URL.split('#/')[0] + 'redirect.html?v=' + shareInfo.URL.split('#/')[1] + '&a=' + this.activityID + '&u=' + this.userIdForActivity + '&n=' + this.userName + '&shareTitle=' + shareInfo.TITLE + '&shareDesc=' + shareInfo.CONTENT + '&shareImgUrl=' + this.systemUrl + shareInfo.IMGURL
            } else {
              goLink = shareInfo.URL + '&u=' + this.userIdForActivity + '&a=' + this.activityID + '&n=' + this.userName + '&shareTitle=' + shareInfo.TITLE + '&shareDesc=' + shareInfo.CONTENT + '&shareImgUrl=' + this.systemUrl + shareInfo.IMGURL
            }
          } else {
            if (shareInfo.URL.split('#/')[1]) {
              goLink = shareInfo.URL.split('#/')[0] + 'redirect.html?v=' + shareInfo.URL.split('#/')[1] + '&u=' + this.userIdForActivity
            } else {
              goLink = shareInfo.URL + '&u=' + this.userIdForActivity
            }
          }
          // 如果不是二维码推广
          if (shareInfo.URL.indexOf('register-qrcode') === -1) {
            // 设置COOKIES值用来添加指引标识
            goLink = goLink + '&fromShopNet=true'
          }
          window.location.href = goLink
        })
      }
    }
  }
</script>

<style lang="less">
  @import "../../assets/less/variables";

  .share-link {
    padding: 1.2rem;
    margin-top: 3.5rem;

    &__block {
      background-color: @bg-white;
      border:1px solid @line-color;
      border-radius: 8px;
      padding: 0.8rem;
      margin-bottom: 1rem;
      position: relative;

      &_title {
        height: 2rem;
        line-height: 2rem;
        font-size: @font-size-large;
        border-bottom: 1px solid @line-color;
        padding-bottom: 0.6rem;
        font-weight: 500;
      }

      &_label {
        padding: 0.15rem 0.4rem;
        text-align: center;
        // font-size: @font-size-medium;
        position: absolute;
        right: -0.4rem;
        top: 0.9rem;

        &.red {
          border: 1px solid @font-color-red;
          color: @font-color-red;
          background-color: @bg-redlight;
        }

        &.yellowish {
          border: 1px solid @font-color-yellowish;
          color: @font-color-yellowish;
          background-color: @bg-yellowlight;
        }
      }

      &_content {
        padding-top: 1rem;
        display: inline-flex;
        width: 100%;
      }

      &_img {
        display: table-cell;
        width: 5.2rem;
        img {
          width: 90%;
        }
      }

      &_desc {
        display: table-cell;
        width: 70%;
        line-height: 1.6rem;
      }
    }
  }
</style>

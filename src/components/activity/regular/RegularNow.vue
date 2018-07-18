<template>
  <mu-list >
    <mu-container class="demo-container is-stripe">
        <mu-row>
          <mu-col span="12">
                <mu-divider></mu-divider>
                <mu-list-item>
                  <b>发起人：</b>{{this.$store.state.regular.user}}
                </mu-list-item>
          </mu-col>
        </mu-row>
        <mu-row>
          <mu-col span="12">
            <mu-divider></mu-divider>
            <mu-list-item>
              <b>参与人员：</b><span v-for="user in this.$store.state.regular.users" :key="user">{{user}}</span>
            </mu-list-item>
          </mu-col>
          <mu-col span="12">
            <mu-button flat color="primary">
              <mu-icon left value="grade"></mu-icon>
              加入活动
            </mu-button>
          </mu-col>
        </mu-row>
        <mu-row>
          <mu-col span="12">
            <mu-divider></mu-divider>
            <mu-list-item>
              <b>活动时间：</b>{{this.$store.state.regular.begdate}} -- {{this.$store.state.regular.enddate}}
            </mu-list-item>
          </mu-col>
          <mu-col span="12">
            <mu-button flat color="primary">
              <mu-icon left value="alarm"></mu-icon>
              修改时间
            </mu-button>
          </mu-col>
        </mu-row>
        <mu-row>
          <mu-col span="12">
            <mu-divider></mu-divider>
            <mu-list-item>
              <b>主选图书</b>
            </mu-list-item>
          </mu-col>
          <mu-col span="12">
            <mu-list-item>
              <b>备选图书</b>
            </mu-list-item>
          </mu-col>
          <mu-col span="12">
            <mu-button flat color="primary">
              <mu-icon left value="description"></mu-icon>
              生成书单
            </mu-button>
            <mu-divider></mu-divider>
          </mu-col>
        </mu-row>
      </mu-container>
  </mu-list>
</template>

<script>
import RegularBottomNav from 'components/comment/RegularBottomNav'

export default {
  name: 'RegularNow',
  components: {
    RegularBottomNav
  }
}
</script>

<style scoped>
span{
  padding-right: 10px;
}
</style>

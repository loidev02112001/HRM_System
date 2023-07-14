<template>
    <div class="side__menu-container">
        <img :src="mainLogo" alt="TLU LOGO" class="side__menu-logo" />
        <router-link class="side__menu-item" v-for="menu in menuRouter" :key="menu.path" :to="menu.path">
            <!-- Dynamic component -->
            <component :is="menu.pageIcon" class="side__menu-item-icon"></component>
            <span>{{ menu.label }}</span>
        </router-link>
        <div class="log__out-section" @click="handleLogout">
            <ImportOutlined />
            Đăng xuất
        </div>
    </div>
</template>
<script setup>
import Cookie from 'js-cookie'
import { ImportOutlined } from '@ant-design/icons-vue'
import { useRouter } from 'vue-router';
import mainLogo from '@/assets/images/dthl_logo.png'
import { menuRouter } from '@/constants/menuItem'


const router = useRouter()

const handleLogout = () => {
    Cookie.remove('accessToken')
    localStorage.clear()
    router.push('/login')
}
</script>
<style lang="scss" scoped>
.side__menu-container {
    display: flex;
    flex-direction: column;
    box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.05);

    .side__menu-logo {
        width: 150px;
        height: 150px;
        object-fit: cover;
        margin: 32px auto;
    }

    .side__menu-item {
        padding-left: 24px;
        width: calc(100% - 8px);
        cursor: pointer;
        border-radius: 8px;
        min-height: 40px;
        display: flex;
        align-items: center;
        margin: 0px 4px ;
        &:hover {
            background-color: var(--primary-color);
            color: #fff;
        }
        .side__menu-item-icon{
            margin-right: 10px;
        }
    }

    .log__out-section {
        padding-left: 24px;
        width: calc(100% - 8px);
        display: flex;
        align-items: center;
        gap: 12px;
        cursor: pointer;
        border-radius: 8px;
        margin: 0px 4px 35px;
        min-height: 40px;
        font-size: 15px;

        &:hover {
            background-color: var(--primary-color);
            color: #fff;
        }
    }
}
</style>
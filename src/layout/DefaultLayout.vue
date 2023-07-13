<template>
    <div className="default__layout-container">
        <div className="menu__side">
            <SideMenu />
        </div>
        <div className="page__content">
            <Header />
            <router-view></router-view>
        </div>
    </div>
</template>
<script setup>
import SideMenu from '@/components/SideMenu.vue';
import Header from '@/components/Header.vue';
</script>
<style scoped lang="scss">
.default__layout-container {
    display: flex;
    height: 100vh;
    overflow: hidden;

    .menu__side {
        width: 20%;
        height: 100%;
        flex-shrink: 0;

        .side__menu-container {
            height: 100%;

            .ant-menu {
                height: 100%;
            }
        }
    }

    .page__content {
        flex: 1;
        height: 100%;
        padding: 15px 28px 0px;
        background-color: #f3f0f0;
        max-width: 80%;
    }
}
</style>
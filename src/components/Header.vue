<template>
    <div class="page__content-header">
        <div class="header__bread-cum">
            <HomeIcon :size=20 />
            <span class="bread__cum-path">
                {{ breadcum }}
            </span>
        </div>
        <div class="header__user-info">
            <div class="name_and_status">
                <div class="header__user-name">{{ accountName }}</div>
                <span class="header__user-status">
                    {{ accountStatus === 'Active' ? 'Đang hoạt động' : 'Chưa hoạt động' }}
                </span>
            </div>
            <img :src="fallbackToDefaultAvatar(accountAvatar)" alt="account avatar" class="header__user-img" />
            <a-dropdown overlayClassName="header__action-dropdown" placement="bottomLeft">
                <a class="ant-dropdown-link" @click.prevent>
                    <EllipsisOutlined />
                </a>
                <template #overlay>
                    <a-menu>
                        <a-menu-item @click="showModal">
                            <a href="javascript:;">Đổi mật khẩu</a>
                        </a-menu-item>
                    </a-menu>
                </template>
            </a-dropdown>
        </div>
        <a-modal v-model:visible="visible" title="Đổi mật khẩu" @ok="handleOk" ok-text="Đổi mật khẩu" cancel-text="Huỷ">
            <div class="change__password-container">
                <div class="change__password-label">Mật khẩu cũ</div>
                <CustomInput placeholder="Mật khẩu cũ" type="password" v-model:value="oldPassword" />
                <div class="change__password-label">Mật khẩu mới</div>
                <CustomInput placeholder="Mật khẩu mới" type="password" v-model:value="newPassword" />
                <div class="change__password-label">Xác nhận mật khẩu mới</div>
                <CustomInput placeholder="Nhập lại mật khẩu mới" type="password" v-model:value="confirmPassword" />
            </div>
        </a-modal>
    </div>
</template>

<script setup>
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';
import { EllipsisOutlined } from '@ant-design/icons-vue'
import { storeToRefs } from 'pinia';
import { notification } from 'ant-design-vue';

import HomeIcon from './HomeIcon.vue';
import { convertRouteToVNS } from '@/utils/index.js';
import { userInforStore } from '@/stores/userInfor';
import CustomInput from '@/components/CustomInput.vue'
import { fallbackToDefaultAvatar } from '@/utils/index.js';
import { useChangePassMutation } from '@/api/auth/changePassword'

const { accountName, accountStatus, accountAvatar } = storeToRefs(userInforStore())
const oldPassword = ref('')
const newPassword = ref('')
const confirmPassword = ref('')
const router = useRouter()
const { mutate: changePass } = useChangePassMutation()
const visible = ref(false)

const showModal = () => {
    visible.value = true;
}

const handleOk = () => {
    const { valid, errorMessage } = validatePassword(oldPassword.value, newPassword.value, confirmPassword.value);
    if (!valid) {
        notification.error({
            message: errorMessage,
        });
        return;
    }
    changePass({ oldPassword: oldPassword.value, newPassword: newPassword.value })
}

const breadcum = computed(() => {
    const currentPath = router.currentRoute.value.path
    return currentPath === '/' ? ' >> Trang chủ' : convertRouteToVNS(currentPath).replace('/', ' >> ')
})

const validatePassword = (oldPassword, newPassword, confirmPassword) => {
    if (oldPassword === newPassword) {
        return {
            valid: false,
            errorMessage: 'Mật khẩu mới phải khác với mật khẩu cũ'
        }
    }
    if (newPassword !== confirmPassword) {
        return {
            valid: false,
            errorMessage: 'Mật khẩu mới và mật khẩu xác nhận không khớp'
        }
    }
    if (newPassword?.length < 6) {
        return {
            valid: false,
            errorMessage: 'Mật khẩu mới phải ít nhất 6 kí tự'
        }
    }
    return { valid: true }
}
</script>

<style scoped lang="scss">
.page__content-header {
    width: 100%;
    border-radius: 6px;
    height: var(--header-height);
    background-color: #fff;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0px 20px;
    margin-bottom: 28px;

    .header__bread-cum {
        display: flex;
        justify-content: center;

        .bread__cum-path {
            font-size: 14px;
            margin: 2px 0 0 3px;
            text-transform: capitalize;
        }
    }

    .header__user-info {
        display: flex;
        align-items: center;
        gap: 12px;


        .header__user-img {
            width: 42px;
            height: 42px;
            object-fit: cover;
            border-radius: 50%;
        }

        .name_and_status {
            text-align: right;
        }

        .header__user-name {
            font-weight: 500;
        }
    }
}

.change__password-container {
    .change__password-label {
        margin-bottom: 6px;
        font-weight: 500;
    }
}

.header__user-status {
    color: #737373;
    font-size: 14px;
}

.anticon-ellipsis {
    transform: rotate(90deg);
}
</style>
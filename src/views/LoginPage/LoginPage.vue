<template>
  <div class="login__container">
    <div class="login__container-inner">
      <div class="login__left">
        <img src="../../assets/images/login_bg.jpg" alt="Login background" />
      </div>
      <div class="login__right">
        <div class="login__right-title">Chào mừng trở lại</div>
        <div class="login__right-desc">Rất vui được gặp lại</div>
        <div class="login__right-form">
          <span class="login__right-label">Email</span>
          <CustomInput size="large" placeholder="Vui lòng nhập email" v-model:value="email" />
          <span class="login__right-label">Mật khẩu</span>
          <CustomInput size="large" type="password" placeholder="Vui lòng nhập mật khẩu" v-model:value="password" />
          <CustomButton class="login__right-btn" large @handleClick="handleLogin" text="Đăng nhập" />
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import CustomInput from '@/components/CustomInput.vue';
import CustomButton from '@/components/CustomButton.vue';
import { useLoginMutation } from '@/api/auth/login';
import { ref } from 'vue';

const email = ref('')
const password = ref('')
const { mutate: login } = useLoginMutation()
const handleLogin = () => {
  login({ email: email.value, password: password.value })
}
</script>
<style scoped lang="scss">
.login__container {
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  inset: 0;
  background-image: linear-gradient(120deg, #a1c4fd 0%, #c2e9fb 100%);

  .login__container-inner {
    width: 70%;
    height: calc(100vh - 150px);
    border-radius: 8px;
    box-shadow: 7px 6px 6px 2px rgba(0, 0, 0, 0.38);
    display: flex;
    align-items: center;

    .login__left {
      width: 50%;
      height: 100%;

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }

    .login__right {
      flex: 1;
      height: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 15px 30px;
      background: #fff;

      .login__right-title {
        font-size: 30px;
        font-weight: 600;
      }

      .login__right-desc {
        font-style: italic;
      }

      .login__right-form {
        width: 100%;
      }

      .login__right-label {
        margin: 12px 0;
        display: block;
      }

      .login__right-btn {
        margin-top: 40px;
        width: 100%;
      }
    }
  }
}
</style>
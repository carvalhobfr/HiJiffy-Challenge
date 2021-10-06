<template>
  <div class="user-area">
    <img  class="user-area__notifications" src="../../assets/svgs/bell.svg" alt="Notification Bell">
    <img class="user-area__avatar" src="../../assets/avatar.png" alt="User Avatar" />
  </div>
</template>


<style lang="scss" scoped>
.user-area {
  display: flex;
  align-items: center;
  justify-content: flex-end;

  &__notifications {
    margin-right: 40px;
  }
  &__avatar {
    height: 40px;
    border-radius: 50%;
  }
}
</style>


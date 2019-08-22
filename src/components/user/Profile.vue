<template>
  <div>
    <ProfileForm />
    <ProfilePassword />
  </div>
</template>

<script>
  import ProfileForm from '@/components/user/ProfileForm'
  import ProfilePassword from '@/components/user/ProfilePasswordForm'
  
  export default {
    name: "Profile",
    components: {
      ProfileForm,
      ProfilePassword
    }
  }
</script>

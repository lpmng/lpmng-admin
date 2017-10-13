<template>
  <div class="notif">
    <img class="icon" src="../../src/assets/IcoMoon/SVG/273-checkmark.svg" v-if="type == 'success'"/> 
    <img class="icon" src="../../src/assets/IcoMoon/SVG/272-cross.svg" v-if="type == 'error'"/> 
    <p>{{msg}}</p>
  </div>
</template>

<script>
export default {
  name: 'notif',
  props: ['msg', 'type']
}
</script>
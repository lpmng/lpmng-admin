<template>
  <div class="notif">
    <img class="icon" src="../../src/assets/IcoMoon/SVG/273-checkmark.svg"/> 
    <p>{{msg}}</p>
  </div>
</template>

<script>
export default {
  name: 'notif',
  props: ['msg', 'type']
}
</script>
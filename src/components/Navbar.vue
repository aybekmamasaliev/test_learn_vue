<template>
    <div class="navbar">
        <div @click="$router.push('/')" class="cursor">Vue 3</div>
        <div class="navbar__btns">
            <my-button @click="$router.push('/posts')">Posts</my-button>
            <my-button style="margin-left:20px" @click="$router.push('/about')">About</my-button>
            <my-button style="margin-left:20px" @click="$router.push('/store')">Store</my-button>
            <!-- <my-button style="margin-left:20px" >Main</my-button> -->
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return{

        }
    }
    
}
</script>
<style scoped>
    .navbar{
        height: 50px;
        background: lightgray;
        box-sizing: border-box;
        box-shadow: 2px 2px 4px gray;
        display: flex;
        align-items: center;
        padding:0 15px
    }
    .navbar__btns{
        margin-left: auto;
    }

    .cursor{
        cursor:pointer
    }
</style>
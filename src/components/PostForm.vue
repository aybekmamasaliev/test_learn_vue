<template>
    <form @submit.prevent>
        <h4>Create a post</h4>
        <my-input v-model="post.title" v-focus  placeholder="Name" />
        <my-input v-model="post.body"  placeholder="Definition" />
        <my-button @click="createPost">Create</my-button>
    </form>
</template>
<script>

export default {
    data() {
        return {
            post: {
                title: "",
                body: "",
            }
        }
    },
    methods:{
        createPost(){
            this.post.id = Date.now();
            this.$emit("create", this.post)
            this.post = {
                title:"",
                body:""
            }
        }
    } 
}
</script>
<style scoped>
form {
    display: flex;
    flex-direction: column;
}

.btn {
    margin-top: 15px;
    align-self: flex-end;
    padding: 10px 15px;
    background: none;
    color: teal;
    border: 1px solid teal;
}


</style>

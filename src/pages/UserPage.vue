<template>
    <div>
        <h1>Page with posts</h1>
        <my-input v-model="searchQuery" v-focus placeholder="Search..." />
        <div class="app__btns">
            <my-button @click="showDialog" style="margin:20px 0 20px 0">Create post</my-button>
            <my-select v-model="selectedSort" :options="sortOptions" />
        </div>
        <my-dialog v-model:show="dialogValue">
            <post-form @create="createPost" :show="true" />
        </my-dialog>
        <post-list :posts="sortedAndSearchPosts" @remove="removePost" v-if="!isPostLoading" />
        <div v-else>Loading ... </div>
        <div v-intersection="fetchUsersLoad" class="observer"></div>
        <!-- <div class="page__wrapper">
            <div class="page" v-for="pageNumber in totalPages" :key="pageNumber"
            @click="changePage(pageNumber)"
                :class="{ 'current-page': page === pageNumber }">{{ pageNumber }}</div>
        </div> -->
    </div>
</template>
<script>
import PostForm from '@/components/PostForm.vue'
import PostList from '@/components/PostList.vue'
import axios from "axios"
export default {
    components: { PostForm, PostList },
    data() {
        return {
            posts: [],
            dialogValue: false,
            isPostLoading: false,
            selectedSort: "",
            searchQuery: "",
            page: 1,
            limit: 10,
            totalPages: 0,
            sortOptions: [
                { value: "title", name: "By name" },
                { value: "body", name: "By content" },
            ]
        }
    },
    methods: {
        // changePage(pageNumber){
        //     this.page=pageNumber;
        //     this.fetchUsers();
        // },
        createPost(post) {
            this.posts.push(post);
            this.dialogValue = false
        },
        removePost(post) {
            this.posts = this.posts.filter(p => p.id !== post.id)
        },
        showDialog() {
            this.dialogValue = true
        },
        async fetchUsers() {
            try {
                this.isPostLoading = true
                const response = await axios.get("https://jsonplaceholder.typicode.com/posts", {
                    params: {
                        _page: this.page,
                        _limit: this.limit
                    }
                });
                this.totalPages = Math.ceil(response.headers['x-total-count'] / this.limit)
                this.posts = response.data;
            } catch (e) {
                alert("error")
            } finally {
                this.isPostLoading = false;
            }
        },

        async fetchUsersLoad(){
            try {
                this.page+=1;
                // this.isPostLoading = true
                const response = await axios.get("https://jsonplaceholder.typicode.com/posts", {
                    params: {
                        _page: this.page,
                        _limit: this.limit
                    }
                });
                this.totalPages = Math.ceil(response.headers['x-total-count'] / this.limit)
                this.posts = [...this.posts, ...response.data]
            } catch(e) {
                alert("error")
            } 
            // finally {
            //     this.isPostLoading = false;
            // }
        }
    },
    mounted() {
        this.fetchUsers()
        // console.log(this.$refs.observer)
        // const options={     
        //     rootMargin:"0px",
        //     threshold:1.0
        // }
        // const callback = (entries, observer) => {
        //     if(entries[0].isIntersecting && this.page < this.totalPages){
        //         this.fetchUsersLoad();
        //     }
        // };
        // const observer = new IntersectionObserver(callback, options);
        // observer.observe(this.$refs.observer);
    },
    computed: {
        sortedPosts() {
            return [...this.posts].sort((post1, post2) => {
                return post1[this.selectedSort]?.localeCompare(post2[this.selectedSort])
            })
        },
        sortedAndSearchPosts() {
            return this.sortedPosts.filter(post => post.title.toLowerCase().includes(this.searchQuery.toLocaleLowerCase()))
        }
    },
    watch: {
        // dialogValue(newValue) {
        //     console.log(newValue)
        // }

        // page(){
        //     this.fetchUsers()
        // }
    }
}
</script>
<style>
* {
    box-sizing: border-box;
    margin: 0;
    padding: 0
}

.app {
    padding: 20px;
}

.app__btns {
    display: flex;
    justify-content: space-between;
}

.page__wrapper {
    display: flex;
    margin-top: 15px;
    justify-content: space-around;
}

.page {
    border: 1px solid red;
    padding: 5px;
    cursor:pointer
}

.current-page {
    border: solid 2px teal
}

.observer{
    height:30px;
    background: green;
}
</style>

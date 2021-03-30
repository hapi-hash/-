<template>
    <div class="navside">

        <template v-for="(navMenu,index) in navMenus">
            <!-- 最后一级菜单 -->
        

        <!-- 此菜单下还有子菜单 -->
        <el-submenu v-if="navMenu.children" :key="navMenu.id" :index="index + ''">
            <!--一级菜单 -->
                <template slot="title">
                <!-- <svg-icon :iconClass="navMenu.meta.icon" :classNmae="navMenu.meta.icon" /> -->
                <span slot="title">{{ navMenu.meta.name }}</span>
            </template>
            <el-menu-item v-for="subItem in navMenu.children" :key="subItem.id" :index="subItem.path">{{ subItem.meta.name }}</el-menu-item>
        </el-submenu>
        <el-menu-item v-else
                        :key="navMenu.id" :data="navMenu" :index="navMenu.path" 
                    >
            <!-- <i :class="navMenu.entity.icon"></i> -->
            <span slot="title">{{navMenu.meta.name}} {{navMenu.path}}</span>
        </el-menu-item>
        </template>
    </div>
</template>
<script>
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
    name: 'navside',
    props: ['navMenus'],
    data() {
        return {
            
        }
    },
    watch: {
        
    },
    mounted() {
        console.log(this.navMenus)
    }
})
</script>
<style scoped>

</style>
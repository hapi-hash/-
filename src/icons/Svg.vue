<template>
    <svg :class="svgClass" aria-hidden="true">
        <use :xlink:href="iconName"></use>
    </svg>
</template>
<script>
import { ref, computed } from '@vue/composition-api'
export default {
    name: "SvgIcon",
    // props: ['iconClass', 'classNmae'],
    props: {
        iconClass: {
            type: String, //定义接收值类型
            default: ''
        },
        classNmae: {
            type: String, //定义接收值类型
            default: ''
        }
    },
    setup(props){
        // console.log(props.iconClass, props.classNmae)
        const msg = ref("阿德撒旦阿德撒旦阿德撒旦");
        

        //计算属性，得出最终结果，并返回
        const iconName = computed(() => `#icon-${props.iconClass}`);
        const svgClass = computed(() => {
            if(props.classNmae){
                return `svg-icon ${props.classNmae}`
            }else{
                return `svg-icon`
            }
        })
        
        

        return {
            msg,
            iconName,
            svgClass
        }
    }
}
</script>
<style lang="scss" scoped>
.svg-icon{
    width:1em;
    height:1em;
    fill: currentColor;
}
</style>
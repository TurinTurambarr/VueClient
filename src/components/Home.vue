<template>
    <div>
        <!-- <v-container fluid>
            <h1>тест заливки фото в firebase store</h1>

            <img :src="imageUrl" height="150px">
            
            <v-flex>
                <input 
                ref="fileInput"
                type="file" 
                style="display: none" 
                @change="onFileSelected" 
                accept="image/*" 
                >
                <v-btn @click="onPickFile">Upload</v-btn>
            </v-flex>
        </v-container> -->
    </div>
</template>

<script>
    import Vue from 'vue'

    export default {
      data(){
          return {
              selectedFile: null,
              imageUrl: '',
              image: null
          }
      },
      methods: {
          onFileSelected (event) {
             const files = event.target.files
             let filename = files[0].filename

             if(filename.lastIndexOf('.') <= 0){
                 return alert('Please add a valid file!')
             }
             
             const fileReader = new FileReader()

             fileReader.addEventListener('load', ()=>{
                 this.imageUrl = fileReader.result
             })

             fileReader.readAsDataURL(files[0])
             this.image = files[0]

          },
          onPickFile () {
              this.$refs.fileInput.click()
          },
          serverTest () {
              
          }
      }
    }
</script>


<style scoped>
.car-link {
    position: absolute;
    bottom:50px;
    left:50%;
    background: rgba(0, 0, 0, 0.5);
    transform: translate(-50%, 0);
    padding: 5px 15px;
    border-top-right-radius: 5px;
    border-top-left-radius: 5px;
}
</style>
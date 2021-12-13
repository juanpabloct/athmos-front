<template>
  <b-container class="about">
    <div v-if="loading">Cargando...</div>
    <div v-else>User: {{ user }}</div>
    <b-row>
      <b-col>
        <b-button v-b-modal.create>Launch demo modal</b-button>

        <b-modal id="create" title="BootstrapVue" @cancel="cancel" @ok="crear">
          <p class="my-4">Hello from modal!</p>

          <b-row>
            <b-col sm="12" md="4">
              <b-form-group
                label="Nombre del curso"
                label-for="name"
                valid-feedback="Perfecto"
              >
                <b-form-input id="name" v-model="form.name" trim></b-form-input>
              </b-form-group>
              <b-form-group
                label="Description"
                label-for="description"
                valid-feedback="Perfecto"
              >
                <b-form-input
                  id="description"
                  v-model="form.description"
                  trim
                ></b-form-input>
              </b-form-group>
            </b-col>
          </b-row>
        </b-modal>
      </b-col>
    </b-row>

    <b-table striped hover :fields="fields" :items="courses" />
  </b-container>
</template>
<script>
import { getUserCourses, getUser } from "../services/users";
import { createCourse } from "../services/courses";

export default {
  name: "Courses",
  data() {
    return {
      id: this.$route.params.id,
      courses: [],
      fields: [
        {
          label: "ID",
          align: "left",
          sortable: false,
          key: "id",
        },
        { label: "Nombre del curso", key: "name" },
        { label: "Descripcion", key: "description" },
        {
          label: "Acciones",
          align: "right",
          sortable: false,
          key: "actions",
          width: "100px",
        },
      ],
      form: {
        name: "",
        description: "",
      },
      user: null,
      loading: true,
    };
  },
  mounted() {
    this.getCourses();
    this.getUser();
  },
  methods: {
    getCourses() {
      getUserCourses(this.id).then((data) => {
        this.courses = data;
      });
    },
    getUser() {
      this.loading = true;
      getUser(this.id).then((data) => {
        this.user = data;
        this.loading = false;
      });
    },
    cancel() {
      this.form.name = "";
    },
    crear() {
      const { name, description } = this.form;
      createCourse({ user_id: this.id, name, description });
    },
  },
};
</script>
<template>
  <b-container>
    <b-breadcrumb>
      <b-breadcrumb-item to="/">
        <b-icon
          icon="house-fill"
          scale="1.25"
          shift-v="1.25"
          aria-hidden="true"
        ></b-icon>
        Usuarios
      </b-breadcrumb-item>
    </b-breadcrumb>
    <div v-if="loading">Cargando...</div>
    <div v-else>
      <div>Nombre de usuario: {{ user.username }}</div>
      <div>Correo del usuario: {{ user.email }}</div>
    </div>
    <b-row>
      <b-col>
        <div class="d-flex justify-content-center my-4">
          <b-button variant="primary" size="sm" v-b-modal.create>
            Crear curso
          </b-button>
        </div>

        <b-modal id="create" title="BootstrapVue" @cancel="cancel" @ok="crear">
          <b-row>
            <b-col sm="12" md="12" lg="">
              <b-form-group
                label="Nombre del curso"
                label-for="name"
                valid-feedback="Perfecto"
              >
                <b-form-input id="name" v-model="form.name" trim></b-form-input>
              </b-form-group>
            </b-col>
            <b-col sm="12" md="12" lg="">
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

    <b-table striped hover :fields="fields" :items="courses">
      <template #cell(actions)="{ item }">
        <b-button size="sm" @click="deleteCourse(item)" variant="danger">
          Eliminar
        </b-button>
      </template>
    </b-table>
  </b-container>
</template>
<script>
import * as usersApi from "../services/users";
import * as coursesApi from "../services/courses";

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
    resetForm() {
      this.form = {
        name: "",
        description: "",
      };
    },
    getCourses() {
      usersApi.getUserCourses(this.id).then((data) => {
        this.courses = data;
      });
    },
    getUser() {
      this.loading = true;
      usersApi.getUser(this.id).then((data) => {
        this.user = data;
        this.loading = false;
      });
    },
    cancel() {
      this.resetForm();
    },
    async crear() {
      const { name, description } = this.form;
      await coursesApi.createCourse({ user_id: this.id, name, description });
      this.getCourses();
    },
    deleteCourse(course) {
      coursesApi.deleteCourse(course.id).then(() => {
        this.getCourses();
      });
    },
  },
};
</script>
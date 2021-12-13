<template>
  <b-container class="hello">
    <b-button @click="create = !create">Crear usuario</b-button>
    <FormUser
      :show="create"
      title="Crear usuario"
      :ok="createUser"
      :form="form"
      :hide="hideCreate"
    />
    <FormUser
      :show="!!edit"
      title="Editar"
      okTitle="Actualizar"
      :ok="editUser"
      :form="form"
      :hide="hideEdit"
    />
    <b-table striped hover :items="items" :fields="fields">
      <template #cell(actions)="{ item }">
        <router-link class="me-2" :to="'/courses/' + item.id">
          <b-button size="sm"> Ver </b-button>
        </router-link>
        <b-button
          size="sm"
          class="me-2"
          variant="primary"
          @click="
            edit = item;
            form = {
              username: item.username,
              email: item.email,
            };
          "
        >
          Editar
        </b-button>
        <b-button size="sm" @click="eliminarUsuario(row.item)" variant="danger">
          Eliminar
        </b-button>
      </template>
    </b-table>
  </b-container>
</template>

<script>
import { getUsers, createUser, deleteUser, editUser } from "../services/users";
import FormUser from "./FormUser";

export default {
  name: "Users",
  props: {},
  data() {
    return {
      ms: "Hello Vue!",
      items: [],
      edit: null,
      create: false,
      form: {
        username: "",
        email: "",
      },
      fields: [
        {
          label: "ID",
          align: "left",
          sortable: false,
          key: "id",
        },
        { label: "Nombre de usuario", key: "username" },
        { label: "Email", key: "email" },
        {
          label: "Acciones",
          align: "right",
          sortable: false,
          key: "actions",
          width: "100px",
        },
      ],
    };
  },
  mounted() {
    this.getUsers();
  },
  methods: {
    resetForm() {
      this.form = {
        username: "",
        email: "",
      };
    },
    getUsers() {
      getUsers().then((data) => {
        this.items = data;
      });
    },
    createUser(form) {
      console.log(form);
      const { username, email } = form;
      createUser({ username, email }).then(() => {
        this.resetForm();
        this.getUsers(); // Refresh list
      });
    },
    eliminarUsuario(user) {
      deleteUser(user.id).then(() => {
        this.getUsers(); // Refresh list
      });
    },
    editUser(form) {
      const { username, email } = form;
      editUser(this.edit.id, { username, email }).then(() => {
        this.resetForm();
        this.getUsers(); // Refresh list
      });
    },
    hideCreate() {
      this.create = false;
    },
    hideEdit() {
      this.edit = false;
    },
  },
  components: {
    FormUser,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.hello {
  margin-top: 50px;
  color: aqua;
}
</style>

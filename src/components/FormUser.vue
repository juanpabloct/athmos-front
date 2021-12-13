<template>
  <b-modal
    :visible="show"
    :title="title"
    :ok-title="okTitle"
    :cancel-title="cancelTitle"
    @ok="send"
    @hide="hide"
  >
    <b-form-group
      label="Nombre de usuario"
      label-for="username"
      valid-feedback="Perfecto"
    >
      <b-form-input id="username" v-model="form.username" trim></b-form-input>
    </b-form-group>
    <b-form-group
      label="Correo electrónico"
      label-for="email"
      valid-feedback="Perfecto"
    >
      <b-form-input id="email" v-model="form.email" trim></b-form-input>
    </b-form-group>
  </b-modal>
</template>

<script>
export default {
  name: "FormUser",
  props: {
    show: {
      type: Boolean,
      required: true,
    },
    title: {
      type: String,
      default: "Crear usuario",
    },
    form: {
      type: Object,
      default: () => ({
        username: "",
        email: "",
      }),
    },
    ok: {
      type: Function,
      default: () => {},
    },
    okTitle: {
      type: String,
      default: "Crear",
    },
    cancelTitle: {
      type: String,
      default: "Cancelar",
    },
    hide: {
      type: Function,
    },
  },
  methods: {
    send() {
      this.ok(this.form);
    },
  },
};
</script>

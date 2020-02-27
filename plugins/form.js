import Form from '@/custom/form/form'

export default ({ $axios }, inject) => {
  inject('form', data => new Form(data, $axios))
}

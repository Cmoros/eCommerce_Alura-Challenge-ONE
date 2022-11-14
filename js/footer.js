import Form from "../js/modules/Form.js"
import MessageService from "../services/MessageService.js"

const errors = {
  nosotrosName: {
    message: "Máximo de 40 caracteres",
    regExp: /^.{1,40}$/
  },
  nosotrosMessage: {
    message: "Máximo de 120 caracteres",
    regExp: /^.{1,120}$/
  },
}

const footerFormHTML = document.querySelector('.form--contacto')

const footerForm = new Form(footerFormHTML, errors, async function() {
  const inputs = footerFormHTML.querySelectorAll("[name]");
  const data = {}
  inputs.forEach(input => data[input.name] = input.value)
  const message = await MessageService.createMessage(data)
  console.log(message)
  if (Object.keys(message).length > 0) {
    console.log('Mensaje enviado correctamente');
    this.restartForm()
    return
  }
  console.log('Error enviando el mensaje')
})
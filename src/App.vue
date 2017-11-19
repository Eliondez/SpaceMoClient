<template>
  
  <b-container fluid class="bv-example-row bv-example-row-flex-cols">
  <b-navbar toggleable="md" type="light" variant="light">
    <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>

    <b-navbar-brand href="#">SpaceMiner</b-navbar-brand>

    <b-collapse is-nav id="nav_collapse">
      <b-navbar-nav>
        <b-nav-item href="#">Link</b-nav-item>
        <b-nav-item href="#" disabled>Disabled</b-nav-item>
      </b-navbar-nav>

      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto">

        <b-nav-form>
          <b-form-input size="sm" class="mr-sm-2" type="text" placeholder="Search"/>
          <b-button size="sm" class="my-2 my-sm-0" type="submit">Search</b-button>
        </b-nav-form>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
  <b-row>
    <b-col>
      <b-tabs>
        <b-tab title="Field" active>
          <br>
          <b-row>
            <b-col>
            </b-col>
            <b-col>
              <canvas></canvas>
              <button @click="emitSocket" class="btn btn-default">Send message</button>
            </b-col>
            <b-col>
            </b-col>
          </b-row>
        </b-tab>
        <b-tab title="second">
          <br>
          <b-row align-self="end">
            <b-col>
              <b-alert show variant="warning">Warning Alert</b-alert>
            </b-col>
          </b-row>
        </b-tab>
        <b-tab title="Chat">
          <br>
          <b-row>
            <b-col md=3>
              <b-list-group>
                <b-list-group-item v-for="user in users" href="#" :key="user.id" v-bind:active="user.id === currentUserId" @click="currentUserId = user.id">
                  {{ user.name }}
                </b-list-group-item>
              </b-list-group>
            </b-col>
            <b-col md=6>
              <b-card>
                <div class="scroll-area">
                  <div class="chat-messages-container">
                    <div v-for="mess in messages" class="message-container" v-bind:class="{ 'r-mes': mess.from == 'Elion' }">
                      <div class="message-body">
                        <span class="sender-name">{{ mess.from }}</span>
                        <span class="message-date">{{ mess.date }}</span>
                        <br>
                        {{ mess.message }}
                      </div>
                    </div>
                  </div>
                </div>

                <b-input-group align-self="end">
                  <b-form-input v-model="draft"></b-form-input>
                  <b-input-group-button slot="right">
                    <b-btn variant="info" @click="sendMessage" v-bind:disabled="draft === ''">Send</b-btn>
                  </b-input-group-button>
                </b-input-group>
              </b-card>
            </b-col>
          </b-row>
        </b-tab>
      </b-tabs>
    </b-col>
  </b-row>
  
  
  </b-container>
</template>

<script>
import io from 'socket.io-client';

export default {
  name: 'app',
  data () {
    return {
      draft: "",
      users: [
        {
          id: 1,
          name: "Elion"
        },
        {
          id: 2,
          name: "Jane"
        },
        {
          id: 3,
          name: "Ann"
        }
      ],
      messages: [
        {
          from: "Jane",
          date: "03:54",
          message: "Hey hoy!!!"
        },
        {
          from: "Elion",
          date: "03:54",
          message: "Hey hoy!!!"
        },
        {
          from: "Jane",
          date: "03:54",
          message: "Hey hoy!!!"
        }
      ],
      currentUserId: 1,
      socket: null
    }
  },
  methods: {
    sendMessage: function() {
      var message = {
        from: "Elion",
        date: new Date(),
        message: this.draft
      }
      this.messages.push(message);
      this.draft = "";
      $('.scroll-area').scrollTop(100);
      console.log($('.scroll-area').height());
      console.log($('.scroll-area').scrollTop());
    },
    emitSocket: function() {
      this.socket.emit('azaza', { id: 123 });
      console.log(123);
    }
  },
  created: function () {
    // `this` указывает на экземпляр vm
    console.log('Эзкемпляр создан! Ура, Торварищи!!!');
    var socket = io('http://localhost:3000');
    this.socket = socket;

    console.log('init');

    socket.on('connect', function() {
       console.log('connect ' + socket.id);
    });
  }
}
</script>

<style>
  canvas {
    width: 400px;
    height: 400px;
    border: 1px solid black;
  }

  .scroll-area {
    height: 400px;
    overflow-y: auto;
    border: 1px solid #ccc;
    border-radius: 5px;
    margin-bottom: 5px;
  }

  .chat-messages-container {
    display: flex;
    flex-direction: column;
  }

  .message-container {
    display: flex;
    justify-content: flex-start;
  }

  .r-mes {
    justify-content: flex-end;
  }

  .message-body {
    padding: 10px;
    border: 1px solid #ccc;
    box-shadow: 1px 1px 1px #ccc;
    border-radius: 10px;
    margin: 5px;
  }
</style>

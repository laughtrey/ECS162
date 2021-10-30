import reactRefresh from '@vitejs/plugin-react-refresh'

/**
 * https://vitejs.dev/config/
 * @type { import('vite').UserConfig }
 */
export default {
  // plugins: [reactRefresh()],
  // server: {
  //   hmr: {
  //     port: 443,
  //   },
  //   proxy: {
  //     '/api': {
  //       target: 'https://movies-ajax-server.profamenta.repl.co',
  //       changeOrigin: true,
  //       secure: false,
  //       ws: true
  //     }
  //   }
  // },

  plugins: [reactRefresh()],
  server: {
    hmr: {
      port: 3030,
    },
    proxy: {
      '/api': {
        target: 'https://final-project-ajax-server-ngoray-kyohei-rutwiktipireddy-ray.ecs162instruct.repl.co',
        changeOrigin: true,
        secure: false,
        ws: true
      }
    }
  },

}

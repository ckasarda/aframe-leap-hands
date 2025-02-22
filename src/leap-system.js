import { Leap } from '../lib/leap';
import { transform } from '../lib/leap.transform.js';

// Defaults from leap.transform.js.
var DEFAULT_SCALE = 0.001;
var DEFAULT_POSITION = new THREE.Vector3();
var DEFAULT_QUATERNION = new THREE.Quaternion();
var DEFAULT_HOST = '127.0.0.1';
var DEFAULT_PORT = '6436';

Leap.Controller.plugin('transform', transform);

/**
 * Leap Motion system for A-Frame.
 */
export const System = AFRAME.registerSystem('leap', {
  schema: {
    host: {default: DEFAULT_HOST},
    port: {default: DEFAULT_PORT},
    vr: {default: true},
    scale: {default: DEFAULT_SCALE},
    position: {
      type: 'vec3',
      default: {
        x: DEFAULT_POSITION.x,
        y: DEFAULT_POSITION.y,
        z: DEFAULT_POSITION.z,
      }
    },
    quaternion: {
      type: 'vec4',
      default: {
        x: DEFAULT_QUATERNION.x,
        y: DEFAULT_QUATERNION.y,
        z: DEFAULT_QUATERNION.z,
        w: DEFAULT_QUATERNION.w
      }
    }
  },

  init: function () {
    var {host} = this.data;
    this.controller = Leap.loop({host, port})
      .use('transform', this.data);
  },

  getFrame: function () {
    return this.controller.frame();
  }
});

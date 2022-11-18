(self.webpackChunkmp_webgl=self.webpackChunkmp_webgl||[]).push([[324],{16473:(t,i,e)=>{"use strict";e.r(i),e.d(i,{PluginConfigData:()=>PluginConfigData,default:()=>PluginConfigDataModule,getPluginMetadataUrl:()=>y,getPluginUrl:()=>C});var n=e(10385),s=e(15637),a=e(67992),o=e(59279);class PluginConfigData extends a.V{constructor(){super(...arguments),this.name="available-plugin-data",this.availablePlugins=new s.v,this.lastSavedConfiguration=new n.d,this.strict=(0,o.eY)("sesStrict")?["1","true"].includes((0,o.eY)("sesStrict")):null,this.manifestUrl=(0,o.eY)("manifestUrl")}add(t){this.availablePlugins.set(t.name,t)}}var r=e(97542),c=e(57956),u=e(3907);const l="0.0";function g(t){if(!t)return[];const i={[l]:h}["0.0"];if(!i)throw new Error(`[PluginConfigDeserializer] Data with version "${t.version}": not recognized.`);return i(t)}function h(t){return t["0.0"]}const d="0.0";function f(t){const i={[d]:p};if(!t)throw new Error("[PluginConfigSerializer] no data to serialize.");const e=i["0.0"];if(!e)throw new Error('[PluginConfigSerializer] Version "0.0" not recognized.');return e(t)}function p(t){return{[d]:t}}class ConfiguredPluginStore extends u.MU{constructor(t,i,e){super({queue:t,path:`${i}/api/v1/jsonstore/model/plugins/${e}`,batchUpdate:!0,deserialize:g,serialize:f})}}function C(t,i,e){return e+`${t}/${i}/${t}.js`}function y(t,i,e){return e+`${t}/${i}/plugin.json`}class PluginConfigDataModule extends r.Y{constructor(){super(...arguments),this.name="plugin-config",this._registryLoaded=!1}get registryLoaded(){return this._registryLoaded}async init(t,i){if(this.queue=t.queue,this.pluginConfigData=new PluginConfigData,t.loadRegistryAndConfigStore){const e=(await i.getModuleBySymbol(c.y.API)).getApi(),n=await e.getAppKey("showcase","plugin");if(n instanceof Object){const i=n;await this.initializePluginRegistry(i),await this.setupConfigStore(t.baseUrl,t.modelId),this._registryLoaded=!0}}i.market.register(this,PluginConfigData,this.pluginConfigData)}saveConfig(t,i){const e=this.pluginConfigData.lastSavedConfiguration.values();this.log.debugInfo(`configuration for ${t.id} updated. ${JSON.stringify(e,void 0,2)}`),this.currentStore.update(e)}async setupConfigStore(t,i){this.currentStore=new ConfiguredPluginStore(this.queue,t,i);return this.currentStore.read().then((t=>{t||(t=[]),this.log.debugInfo(`Saved configuration data loaded for ${t.length} plugin(s). ${JSON.stringify(t,void 0,2)}`),this.pluginConfigData.lastSavedConfiguration.replace(t),this.pluginConfigData.lastSavedConfiguration.onElementChanged({onAdded:this.saveConfig.bind(this),onUpdated:this.saveConfig.bind(this)})})).catch((t=>this.log.error("Failed to load configured plugins: ",t)))}dispose(t){super.dispose(t),t.market.unregister(this,PluginConfigData),this.pluginConfigData=void 0}async initializePluginRegistry(t){const i=await this.queue.get(this.pluginConfigData.manifestUrl?this.pluginConfigData.manifestUrl:t.manifestUrl,{responseType:"json"}).catch((t=>(this.log.error(t),null)));if(null!==i)for(const e of i.filter((t=>{var i;return!(null===(i=t.versions[t.currentVersion].requiredPolicies)||void 0===i?void 0:i.length)}))){const i=e.meta||y(e.name,e.currentVersion,t.baseUrl),n=await this.queue.get(i,{responseType:"json"}).catch((t=>(this.log.error(t),null)));null!==n&&this.pluginConfigData.add({name:e.name,version:e.currentVersion,config:n.config||{},applicationKey:t.applicationKey||e.applicationKey||"unknown-app-key",src:e.src||C(e.name,e.currentVersion,t.baseUrl),meta:i,enabled:!1,strict:null===this.pluginConfigData.strict?e.sesStrict:this.pluginConfigData.strict})}}async getConfiguredPlugins(){const t=await this.currentStore.read()||[],i=[];return t.forEach((t=>{if(t.enabled){const e=this.pluginConfigData.availablePlugins.get(t.id);let n=!(e&&(!e||void 0!==e.strict))||e.strict;e||this.log.warn(`"${t.id}" plugin not found in current plugin manifest -- was it configured with a different one?`);const s={config:t.config||{},src:t.src||e.src,meta:t.meta||e.meta,id:t.id||e.name,strict:n,applicationKey:(null==e?void 0:e.applicationKey)||"FAKE_APP_KEY"};i.push(s)}})),i}}},3907:(t,i,e)=>{"use strict";e.d(i,{MU:()=>JsonStoreStore});var n,s=e(39880),a=e(44584);!function(t){t.GET="GET",t.POST="POST",t.PATCH="PATCH",t.PUT="PUT",t.DELETE="DELETE",t.OPTIONS="OPTIONS"}(n||(n={}));class ReadOnlyStore extends class Auth{constructor(){this._options={responseType:"json"}}get options(){const t=this._options;return t.headers=(0,a.m)(this.url,this._options.headers||{}),t}}{constructor(t){super(),this.config=t,this.url=t.path}async read(){const{deserialize:t}=this.config;let i=null;return this.config.cachedData&&this.config.cachedData.data?i=this.config.cachedData.data:(i=await this.config.queue.get(this.config.path,this.options),this.config.cachedData&&(this.config.cachedData.data=i)),t(i)}clearCache(){this.config.cachedData&&(this.config.cachedData.data=null)}}class JsonStoreStore extends ReadOnlyStore{constructor(t){super(t),this.config=t,this.acceptsPartial=!1,this.config.batchUpdate="batchUpdate"in this.config&&this.config.batchUpdate}async create(t){throw Error("Not implemented")}updateBatch(t,i){const{serialize:e}=this.config,s=[],a=[...new Set([...Object.keys(t),...Object.keys(i)])];for(const e of a){t[e]||i[e]||s.push(this.config.queue.delete(`${this.config.path}/${e}`,this.options))}const o=e(t,i),r=Object.assign(Object.assign({},this.options),{body:o});return s.push(this.config.queue.request(this.config.httpMethod||n.POST,this.config.path,r)),Promise.all(s)}updateInternal(t,i){const{serialize:e}=this.config,a=[],o=Object.assign({},this.options),r=Object.keys(t),c=Object.keys(i),u=(0,s.XN)(r.concat(c));for(const s in u){const r=u[s],c=t[r]||i[r];if(c){const t={};t[r]=c;const s={},u=i[r];u&&(s[r]=u);const l=e(t,s);o.body=l,a.push(this.config.queue.request(this.config.httpMethod||n.POST,this.config.path,o))}else a.push(this.config.queue.delete(`${this.config.path}/${r}`,this.options))}return Promise.all(a)}async update(t,i){this.clearCache(),await(this.config.batchUpdate?this.updateBatch(t,i||{}):this.updateInternal(t,i||{}))}async delete(t){throw Error("Not implemented")}}}}]);
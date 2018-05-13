import utils from './utils';
import { fetchJson } from './fetch';

const {domSelector: $, isArray} = utils;
const render = Symbol('render');

class Region {
    constructor(opts) {
        if (!opts.container) {
            throw '请填写container配置'
        }
        if (!opts.name) {
            throw '请填写name配置'
        } else {
            this[render](opts)
        }
    }

    async [ render](opts) {
        // 获取数据
        let regionData = await fetchJson('/region-data', {});
        regionData = regionData.data;

        // 渲染基础模板
        const tpl = `
            <div class="region-select-wrapper">
                <select id="region-province-select"></select>
                <select id="region-city-select"></select>
                <select id="region-area-select"></select>
                <input id="region-selected" name="${ opts.name }" type="hidden" valid="${ opts.present ? 'present' : ''}">
            </div>
        `
        opts.container.innerHTML = tpl;

        const $provinceSelect = $('#region-province-select');
        const $citySelect = $('#region-city-select');
        const $areaSelect = $('#region-area-select');
        const $result = $('#region-selected');

        let provinceSelected;
        let citySelected;
        let areaSelected;

        let provinceOptions = '<option></option>';
        for ( let item of regionData ) {
            provinceOptions += `<option value="${item.id}">${item.name}</option>`
        }
        $provinceSelect.innerHTML = provinceOptions;

        const provinceChange = (index) => {
            const i = index ? index : parseInt($provinceSelect.value);
            const citys = regionData[i - 1].city;
            let cityOptions = '';
            provinceSelected = i;
            citys.forEach(item => {
                cityOptions += `<option value="${item.id}">${item.name}</option>`
            })
            $citySelect.innerHTML = cityOptions;
            index && ($provinceSelect.value = index)
        }

        const cityChange = (index) => {
            let areas = regionData[provinceSelected - 1].city.filter(item => {
                return item.id === parseInt($citySelect.value)
            })[0].district;

            let areaOptions = '';
            citySelected = parseInt($citySelect.value)
            areas.forEach(item => {
                areaOptions += `<option value="${item.id}">${item.name}</option>`
            });
            $areaSelect.innerHTML = areaOptions;
            index && ($citySelect.value = index);
        }

        const areaChange = (index) => {
            areaSelected = parseInt($areaSelect.value)
            $result.value = provinceSelected + ',' + citySelected + ',' + areaSelected;
            index && ($areaSelect.value = index)
        }

        // 事件绑定
        $provinceSelect.onchange = (e) => {
            provinceChange();
            cityChange();
            areaChange();
        }
        $citySelect.onchange = (e) => {
            cityChange();
            areaChange();
        }
        $areaSelect.onchange = (e) => {
            areaChange();
        }

        // 初始化
        if (opts.initData && isArray(opts.initData)) {
            const data = opts.initData;
            data[0] && provinceChange(data[0]);
            data[1] && cityChange(data[1]);
            data[2] && areaChange(data[2]);
        }
    }
}

export default Region
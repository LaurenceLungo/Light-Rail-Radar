var config = {
    stationName: {
    "15": {"name": "蝴蝶Butterfly", "zone": "1", "lat": 22.37814, "long": 113.96174},
    "260": {"name": "豐景園Goodview Garden", "zone": "1", "lat": 22.38331, "long": 113.97304},
    "20": {"name": "輕鐵車廠Light Rail Depot", "zone": "1", "lat": 22.38183, "long": 113.96337},
    "30": {"name": "龍門Lung Mun", "zone": "1", "lat": 22.38527, "long": 113.96504},
    "10": {"name": "美樂Melody Garden", "zone": "1", "lat": 22.37507, "long": 113.9612},
    "920": {"name": "三聖Sam Shing", "zone": "1", "lat": 22.3825, "long": 113.97676},
    "240": {"name": "兆禧Siu Hei", "zone": "1", "lat": 22.37525, "long": 113.96689}
},
    etaURL: "https://rt.data.gov.hk/v1/transport/mtr/lrt/getSchedule",
    refreshInterval: 15000,
    refreshIntervalSec: "10"
};

export default config;
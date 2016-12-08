angular.module('hospitalApp', ['ionic', 'hospitalApp.controllers', 'ngCordova'])

// .constant('$ionicLoadingConfig', {
//     content: 'Loading Data',
//     animation: 'fade-in',
//     showBackdrop: false,
//     maxWidth: 200,
//     showDelay: 500
// })

.constant('ConstProvince', {
    Province: [
        {"ID":1,"Name":"강원도","Show":false,"Countries":[]},
        {"ID":2,"Name":"경기도","Show":false,"Countries":[]},
        {"ID":3,"Name":"경상남도","Show":false,"Countries":[]},
        {"ID":4,"Name":"경상북도","Show":false,"Countries":[]},
        {"ID":5,"Name":"광주광역시","Show":false,"Countries":[]},
        {"ID":6,"Name":"대구광역시","Show":false,"Countries":[]},
        {"ID":7,"Name":"대전광역시","Show":false,"Countries":[]},
        {"ID":8,"Name":"부산광역시","Show":false,"Countries":[]},
        {"ID":9,"Name":"서울특별시","Show":false,"Countries":[]},
        {"ID":10,"Name":"세종특별자치시","Show":false,"Countries":[]},
        {"ID":11,"Name":"울산광역시","Show":false,"Countries":[]},
        {"ID":12,"Name":"인천광역시","Show":false,"Countries":[]},
        {"ID":13,"Name":"전라남도","Show":false,"Countries":[]},
        {"ID":14,"Name":"전라북도","Show":false,"Countries":[]},
        {"ID":15,"Name":"제주특별자치도","Show":false,"Countries":[]},
        {"ID":16,"Name":"충청남도","Show":false,"Countries":[]},
        {"ID":17,"Name":"충청북도","Show":false,"Countries":[]}
    ],
    Country: {
        '강원도': [{"ID":18,"Name":"강릉시"},{"ID":19,"Name":"동해시"},{"ID":20,"Name":"삼척시"},{"ID":21,"Name":"속초시"},{"ID":22,"Name":"원주시"},{"ID":23,"Name":"춘천시"},{"ID":24,"Name":"태백시"},{"ID":25,"Name":"고성군"},{"ID":26,"Name":"양구군"},{"ID":27,"Name":"양양군"},{"ID":28,"Name":"영월군"},{"ID":29,"Name":"인제군"},{"ID":30,"Name":"정선군"},{"ID":31,"Name":"철원군"},{"ID":32,"Name":"평창군"},{"ID":33,"Name":"홍천군"},{"ID":34,"Name":"화천군"},{"ID":35,"Name":"횡성군"}],
        '경기도': [{"ID":368,"Name":"가평군"},{"ID":369,"Name":"고양시"},{"ID":370,"Name":"고양시 덕양구"},{"ID":371,"Name":"고양시 일산동구"},{"ID":372,"Name":"고양시 일산서구"},{"ID":373,"Name":"과천시"},{"ID":374,"Name":"광명시"},{"ID":375,"Name":"광주시"},{"ID":376,"Name":"구리시"},{"ID":377,"Name":"군포시"},{"ID":378,"Name":"김포시"},{"ID":379,"Name":"남양주시"},{"ID":380,"Name":"동두천시"},{"ID":381,"Name":"부천시"},{"ID":382,"Name":"부천시 소사구"},{"ID":383,"Name":"부천시 오정구"},{"ID":384,"Name":"부천시 원미구"},{"ID":385,"Name":"성남시"},{"ID":386,"Name":"성남시 분당구"},{"ID":387,"Name":"성남시 수정구"},{"ID":388,"Name":"성남시 중원구"},{"ID":389,"Name":"수원시"},{"ID":390,"Name":"수원시 권선구"},{"ID":391,"Name":"수원시 영통구"},{"ID":392,"Name":"수원시 장안구"},{"ID":393,"Name":"수원시 팔달구"},{"ID":394,"Name":"시흥시"},{"ID":395,"Name":"안산시"},{"ID":396,"Name":"안산시 단원구"},{"ID":397,"Name":"안산시 상록구"},{"ID":398,"Name":"안성시"},{"ID":399,"Name":"안양시"},{"ID":400,"Name":"안양시 동안구"},{"ID":401,"Name":"안양시 만안구"},{"ID":402,"Name":"양주시"},{"ID":403,"Name":"양평군"},{"ID":404,"Name":"여주시"},{"ID":405,"Name":"연천군"},{"ID":406,"Name":"오산시"},{"ID":407,"Name":"용인시"},{"ID":408,"Name":"용인시 기흥구"},{"ID":409,"Name":"용인시 수지구"},{"ID":410,"Name":"용인시 처인구"},{"ID":411,"Name":"의왕시"},{"ID":412,"Name":"의정부시"},{"ID":413,"Name":"이천시"},{"ID":414,"Name":"파주시"},{"ID":415,"Name":"평택시"},{"ID":416,"Name":"포천시"},{"ID":417,"Name":"하남시"},{"ID":418,"Name":"화성시","Paren":2}],
        '경상남도': [{"ID":419,"Name":"거제시"},{"ID":420,"Name":"거창군"},{"ID":421,"Name":"고성군"},{"ID":422,"Name":"김해시"},{"ID":423,"Name":"남해군"},{"ID":424,"Name":"밀양시"},{"ID":425,"Name":"사천시"},{"ID":426,"Name":"산청군"},{"ID":427,"Name":"양산시"},{"ID":428,"Name":"의령군"},{"ID":429,"Name":"진주시"},{"ID":430,"Name":"창녕군"},{"ID":431,"Name":"창원시"},{"ID":432,"Name":"창원시 마산합포구"},{"ID":433,"Name":"창원시 마산회원구"},{"ID":434,"Name":"창원시 성산구"},{"ID":435,"Name":"창원시 의창구"},{"ID":436,"Name":"창원시 진해구"},{"ID":437,"Name":"통영시"},{"ID":438,"Name":"하동군"},{"ID":439,"Name":"함안군"},{"ID":440,"Name":"함양군"},{"ID":441,"Name":"합천군","Paren":3}],
        '경상북도': [{"ID":442,"Name":"경산시"},{"ID":443,"Name":"경주시"},{"ID":444,"Name":"고령군"},{"ID":445,"Name":"구미시"},{"ID":446,"Name":"군위군"},{"ID":447,"Name":"김천시"},{"ID":448,"Name":"문경시"},{"ID":449,"Name":"봉화군"},{"ID":450,"Name":"상주시"},{"ID":451,"Name":"성주군"},{"ID":452,"Name":"안동시"},{"ID":453,"Name":"영덕군"},{"ID":454,"Name":"영양군"},{"ID":455,"Name":"영주시"},{"ID":456,"Name":"영천시"},{"ID":457,"Name":"예천군"},{"ID":458,"Name":"울릉군"},{"ID":459,"Name":"울진군"},{"ID":460,"Name":"의성군"},{"ID":461,"Name":"청도군"},{"ID":462,"Name":"청송군"},{"ID":463,"Name":"칠곡군"},{"ID":464,"Name":"포항시"},{"ID":465,"Name":"포항시 남구"},{"ID":466,"Name":"포항시 북구"}],
        '광주광역시': [{"ID":467,"Name":"광산구"},{"ID":468,"Name":"남구"},{"ID":469,"Name":"동구"},{"ID":470,"Name":"북구"},{"ID":471,"Name":"서구"}],
        '대구광역시': [{"ID":472,"Name":"남구"},{"ID":473,"Name":"달서구"},{"ID":474,"Name":"달성군"},{"ID":475,"Name":"동구"},{"ID":476,"Name":"북구"},{"ID":477,"Name":"서구"},{"ID":478,"Name":"수성구"},{"ID":479,"Name":"중구"}],
        '대전광역시': [{"ID":480,"Name":"대덕구"},{"ID":481,"Name":"동구"},{"ID":482,"Name":"서구"},{"ID":483,"Name":"유성구"},{"ID":484,"Name":"중구"}],
        '부산광역시': [{"ID":485,"Name":"강서구"},{"ID":486,"Name":"금정구"},{"ID":487,"Name":"기장군"},{"ID":488,"Name":"남구"},{"ID":489,"Name":"동구"},{"ID":490,"Name":"동래구"},{"ID":491,"Name":"부산진구"},{"ID":492,"Name":"북구"},{"ID":493,"Name":"사상구"},{"ID":494,"Name":"사하구"},{"ID":495,"Name":"서구"},{"ID":496,"Name":"수영구"},{"ID":497,"Name":"연제구"},{"ID":498,"Name":"영도구"},{"ID":499,"Name":"중구"},{"ID":500,"Name":"해운대구"}],
        '서울특별시': [{"ID":501,"Name":"강남구"},{"ID":502,"Name":"강동구"},{"ID":503,"Name":"강북구"},{"ID":504,"Name":"강서구"},{"ID":505,"Name":"관악구"},{"ID":506,"Name":"광진구"},{"ID":507,"Name":"구로구"},{"ID":508,"Name":"금천구"},{"ID":509,"Name":"노원구"},{"ID":510,"Name":"도봉구"},{"ID":511,"Name":"동대문구"},{"ID":512,"Name":"동작구"},{"ID":513,"Name":"마포구"},{"ID":514,"Name":"서대문구"},{"ID":515,"Name":"서초구"},{"ID":516,"Name":"성동구"},{"ID":517,"Name":"성북구"},{"ID":518,"Name":"송파구"},{"ID":519,"Name":"양천구"},{"ID":520,"Name":"영등포구"},{"ID":521,"Name":"용산구"},{"ID":522,"Name":"은평구"},{"ID":523,"Name":"종로구"},{"ID":524,"Name":"중구"},{"ID":525,"Name":"중랑구"}],
        '세종특별자치시': [{"ID":613,"Name":"세종시"}],
        '울산광역시': [{"ID":526,"Name":"남구"},{"ID":527,"Name":"동구"},{"ID":528,"Name":"북구"},{"ID":529,"Name":"울주군"},{"ID":530,"Name":"중구"}],
        '인천광역시': [{"ID":531,"Name":"강화군"},{"ID":532,"Name":"계양구"},{"ID":533,"Name":"남구"},{"ID":534,"Name":"남동구"},{"ID":535,"Name":"동구"},{"ID":536,"Name":"부평구"},{"ID":537,"Name":"서구"},{"ID":538,"Name":"연수구"},{"ID":539,"Name":"옹진군"},{"ID":540,"Name":"중구"}],
        '전라남도': [{"ID":541,"Name":"강진군"},{"ID":542,"Name":"고흥군"},{"ID":543,"Name":"곡성군"},{"ID":544,"Name":"광양시"},{"ID":545,"Name":"구례군"},{"ID":546,"Name":"나주시"},{"ID":547,"Name":"담양군"},{"ID":548,"Name":"목포시"},{"ID":549,"Name":"무안군"},{"ID":550,"Name":"보성군"},{"ID":551,"Name":"순천시"},{"ID":552,"Name":"신안군"},{"ID":553,"Name":"여수시"},{"ID":554,"Name":"영광군"},{"ID":555,"Name":"영암군"},{"ID":556,"Name":"완도군"},{"ID":557,"Name":"장성군"},{"ID":558,"Name":"장흥군"},{"ID":559,"Name":"진도군"},{"ID":560,"Name":"함평군"},{"ID":561,"Name":"해남군"},{"ID":562,"Name":"화순군"}],
        '전라북도': [{"ID":563,"Name":"고창군"},{"ID":564,"Name":"군산시"},{"ID":565,"Name":"김제시"},{"ID":566,"Name":"남원시"},{"ID":567,"Name":"무주군"},{"ID":568,"Name":"부안군"},{"ID":569,"Name":"순창군"},{"ID":570,"Name":"완주군"},{"ID":571,"Name":"익산시"},{"ID":572,"Name":"임실군"},{"ID":573,"Name":"장수군"},{"ID":574,"Name":"전주시"},{"ID":575,"Name":"전주시 덕진구"},{"ID":576,"Name":"전주시 완산구"},{"ID":577,"Name":"정읍시"},{"ID":578,"Name":"진안군"}],
        '제주특별자치도': [{"ID":579,"Name":"서귀포시"},{"ID":580,"Name":"제주시"}],
        '충청남도': [{"ID":581,"Name":"계룡시"},{"ID":582,"Name":"공주시"},{"ID":583,"Name":"금산군"},{"ID":584,"Name":"논산시"},{"ID":585,"Name":"당진시"},{"ID":586,"Name":"보령시"},{"ID":587,"Name":"부여군"},{"ID":588,"Name":"서산시"},{"ID":589,"Name":"서천군"},{"ID":590,"Name":"아산시"},{"ID":591,"Name":"예산군"},{"ID":592,"Name":"천안시"},{"ID":593,"Name":"천안시 동남구"},{"ID":594,"Name":"천안시 서북구"},{"ID":595,"Name":"청양군"},{"ID":596,"Name":"태안군"},{"ID":597,"Name":"홍성군"}],
        '충청북도': [{"ID":598,"Name":"괴산군"},{"ID":599,"Name":"단양군"},{"ID":600,"Name":"보은군"},{"ID":601,"Name":"영동군"},{"ID":602,"Name":"옥천군"},{"ID":603,"Name":"음성군"},{"ID":604,"Name":"제천시"},{"ID":605,"Name":"증평군"},{"ID":606,"Name":"진천군"},{"ID":607,"Name":"청주시"},{"ID":608,"Name":"청주시 상당구"},{"ID":609,"Name":"청주시 서원구"},{"ID":610,"Name":"청주시 청원구"},{"ID":611,"Name":"청주시 흥덕구"},{"ID":612,"Name":"충주시"}]
    }
})

.run(function($ionicPlatform, $cordovaToast, $cordovaSQLite, $ionicHistory, CommonVar) {
    $ionicPlatform.ready(function() {
        if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            cordova.plugins.Keyboard.disableScroll(true);
        }
        if (window.StatusBar) {
            StatusBar.styleLightContent();
        }

        var backbutton = 0;
        $ionicPlatform.registerBackButtonAction(function (event) {
            var cv = $ionicHistory.currentView();

            if (cv.stateId != 'tab.nearby' && cv.stateId != 'tab.region' && cv.stateId != 'tab.bookmark') {
                $ionicHistory.goBack(-1);
                return;
            }

            if (backbutton == 0) {
                backbutton++;
                $cordovaToast.show('종료하시려면 한번더 눌러주세요.', 'short', 'bottom')
                // 2초 후 리셋
                setTimeout(function(){backbutton=0;}, 2000);
            } else {
                navigator.app.exitApp();    // 앱 종료
            }
        }, 100);

        var db = $cordovaSQLite.openDB({name: "ae9cc0e9f29"});

        var sql = 'CREATE TABLE IF NOT EXISTS Favorite (ID INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT UNIQUE, Name TEXT, Tel TEXT, Addr TEXT, Lat TEXT, Long TEXT, Img  TEXT, PlaceID  INTEGER, Date TEXT DEFAULT CURRENT_TIMESTAMP)';

        $cordovaSQLite.execute(db, sql, []).then(function(res) {
            $cordovaSQLite.execute(db, 'SELECT * FROM Favorite', []).then(function(res) {
                var items = res.rows;
                if (items.length > 0) {
                    for (var i=0; i<items.length; i++) {
                        var item = items.item(i);

                        CommonVar.bookmark[item.PlaceID] = {
                            id: item.ID,
                            name: item.Name,
                            tel: item.Tel,
                            imageUrl: item.Img,
                            address: item.Addr,
                            latitude: item.Lat,
                            longitude: item.Long,
                            placeid: item.PlaceID
                        };
                    }
                }
            }, function (err) {
                $cordovaToast.show(err, 'short', 'center');
            });
        }, function (err) {
            $cordovaToast.show(err, 'short', 'center');
        });
        /*
        var applaunchCount = window.localStorage.getItem('launchCount');

        if(applaunchCount){

        }else{
            window.localStorage.setItem('launchCount',1);
        }
        */

        var admobid = {};
        if( /(android)/i.test(navigator.userAgent) ) {
            admobid = { // for Android
                banner: 'ca-app-pub-2739822101941768/3627584339',
            };
        } else if(/(ipod|iphone|ipad)/i.test(navigator.userAgent)) {
            admobid = { // for iOS
                banner: 'ca-app-pub-2739822101941768/3627584339',
            };
        } else {
            admobid = { // for Windows Phone
                banner: 'ca-app-pub-2739822101941768/3627584339',
            };
        }
        if ( AdMob ) {
            AdMob.createBanner( {
                adId: admobid.banner,
                // isTesting: true,
                overlap: false,
                offsetTopBar: false,
                position: AdMob.AD_POSITION.BOTTOM_CENTER,
                bgColor: 'black'
            } );
        }
    });
})

.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider) {
    $ionicConfigProvider.tabs.position('bottom');
    $ionicConfigProvider.tabs.style('standard');
    $ionicConfigProvider.views.maxCache(1);
    if (ionic.Platform.isAndroid()) {
        $ionicConfigProvider.scrolling.jsScrolling(false);
    }

    $stateProvider
    .state('tab', {
        url: '/tab',
        abstract: true,
        templateUrl: 'templates/tabs.html'
    })

    .state('tab.nearby', {
        url: '/nearby',
            views: {
                'tab-nearby': {
                templateUrl: 'templates/tab-nearby.html',
                controller: 'Nearby'
            }
        }
    })

    .state('tab.nearby-map', {
        url: '/nearby/:lat/:long',
            views: {
                'tab-nearby': {
                templateUrl: 'templates/nearby-map.html',
                controller: 'NearbyMap'
            }
        }
    })

    .state('tab.region', {
        url: '/region',
            views: {
                'tab-region': {
                templateUrl: 'templates/tab-region.html',
                controller: 'Region'
            }
        }
    })

    .state('tab.region-map', {
        url: '/region/:lat/:long',
            views: {
                'tab-region': {
                templateUrl: 'templates/region-map.html',
                controller: 'RegionMap'
            }
        }
    })

    .state('tab.bookmark', {
        url: '/bookmark',
            views: {
                'tab-bookmark': {
                templateUrl: 'templates/tab-bookmark.html',
                controller: 'Bookmark'
            }
        }
    })

    .state('tab.bookmark-map', {
        url: '/bookmark/:name/:lat/:long',
            views: {
                'tab-bookmark': {
                templateUrl: 'templates/bookmark-map.html',
                controller: 'BookmarkMap'
            }
        }
    })

    ;

    // $httpProvider.defaults.headers.common = 'Content-Type: application/json';
    // $httpProvider.defaults.useXDomain = true;
    // delete $httpProvider.defaults.headers.common['X-Requested-With'];

    // $urlRouterProvider.otherwise('/tab/bookmark');
    $urlRouterProvider.otherwise('/tab/nearby');
})

.service('CommonVar', function() {
    this.bookmark = {};
    this.keyword = '동물병원';
    this.lat = '';
    this.long = '';

    this.geoOptions = { 
        maximumAge: 3000, 
        timeout: 10000, 
        enableHighAccuracy: true, 
        // priority: cordova.plugins.locationServices.geolocation.priorities.PRIORITY_HIGH_ACCURACY,
        interval: 6000, 
        fastInterval: 1000 
    };

    // this.geoOptions = { maximumAge: 3000, timeout: 10000, enableHighAccuracy: true };

    this.apiKey = '24f409a41bfcc0c787e951cbd65231f2';
    this.searchApi = 'https://apis.daum.net/local/v1/search/keyword.json';
    this.coord2addrApi = 'https://apis.daum.net/local/geo/coord2addr';
    this.addr2coordApi = 'https://apis.daum.net/local/geo/addr2coord';
})

.service('NearbyVar', function() {
    this.maxDisplay = 15;
    this.searchPage = 1;
    this.items = [];
    this.keys = [];
    this.lat = '';
    this.long = '';
})

.service('RegionVar', function() {
    this.maxDisplay = 15;
    this.searchPage = 1;
    this.items = [];
    this.keys = [];
    this.lat = '';
    this.long = '';
})

.factory('DaumAPI', function($http, CommonVar) {
    return {
        search: function(_service) {
            var url = CommonVar.searchApi+'?apikey='+CommonVar.apiKey+
                        '&query='+CommonVar.keyword+
                        '&location='+_service.lat+','+_service.long+
                        '&count='+_service.maxDisplay+
                        '&page='+_service.searchPage+
                        '&sort=2'+
                        '&radius=10000';
            return $http.get(url, {timeout: 5000});
        },

        addr2coord: function(_addr) {
            var url = CommonVar.addr2coordApi+'?apikey='+CommonVar.apiKey+
                        '&q='+_addr+
                        '&output=json';
            return $http.get(url, {timeout: 5000});
        },

        coor2addrApi: function(_service) {
            var url = CommonVar.coord2addrApi+'?apikey='+CommonVar.apiKey+
                        '&longitude='+_service.long+
                        '&latitude='+_service.lat+
                        '&inputCoordSystem=WGS84'+
                        '&output=json';
            return $http.get(url, {timeout: 5000});
        }
    };
})

;
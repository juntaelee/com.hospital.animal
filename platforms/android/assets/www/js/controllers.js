angular.module('hospitalApp.controllers', [])

.controller('Nearby', function(
    $scope, $http, $ionicLoading, $cordovaSQLite,
    $ionicPlatform, $ionicPopup, $cordovaToast,
    DaumAPI, CommonVar, NearbyVar) {

    $scope.myLocation = '';
    $scope.items = [];
    // $scope.ngHideSpinner = '';
    $scope.ngNoneGPS = 'ng-hide';
    $scope.ngNoneMore = 'ng-hide';

    var onSuccess = function(position) {
        // 현재 나의 위치
        CommonVar.lat = position.coords.latitude;
        CommonVar.long = position.coords.longitude;

        NearbyVar.lat = position.coords.latitude;
        NearbyVar.long = position.coords.longitude;

        getAddress();
    };

    var onError = function(error) {
        $cordovaToast.show(error, 'long', 'center');
        $scope.items = [];

        $scope.loadingIndicator.hide();
        $scope.$broadcast('scroll.refreshComplete');
        $scope.ngNoneGPS = '';
        $scope.ngNoneMore = 'ng-hide';
    };

    var getAddress = function() {
        DaumAPI.coor2addrApi(NearbyVar)
            .success(function(data) {
                NearbyVar.keys = [];
                NearbyVar.items = [];
                NearbyVar.searchPage = 1;

                $scope.myLocation = data.fullName;
                $scope.items = [];
                $scope.ngNoneMore = '';
                $scope.ngNoneGPS = 'ng-hide';

                $scope.getMorePlace();
            })
            .error(function(err) {
                $scope.ngNoneGPS = '';
                $scope.ngNoneMore = 'ng-hide';
                $scope.items = NearbyVar.items;
                // $scope.ngHideSpinner = 'ng-hide';
            })
            .finally(function() {
                $scope.loadingIndicator.hide();
                $scope.$broadcast('scroll.refreshComplete');
            })
        ;
    };

    $scope.getMorePlace = function() {
        $scope.loadingIndicator = $ionicLoading.show();
        DaumAPI.search(NearbyVar)
            .success(function(data) {
                var items = data.channel.item;

                if (items.length > 1) {
                    angular.forEach(items, function(item, _index) {
                        if (NearbyVar.keys.indexOf(item.id) < 0) {
                            NearbyVar.keys.push(item.id);

                            if (item.imageUrl == '') {
                                item.imageUrl = 'img/default_avatar.png';
                            }

                            var bookmark = false;
                            if (CommonVar.bookmark[item.id] !== undefined) {
                                bookmark = true;
                            }

                            NearbyVar.items.push({
                                name: item.title,
                                tel: item.phone,
                                imageUrl: item.imageUrl,
                                address: item.address,
                                latitude: item.latitude,
                                longitude: item.longitude,
                                placeid: item.id,
                                distance: item.distance,
                                bookmark: bookmark
                            });
                        }
                    });
                    if (NearbyVar.searchPage == 3) {
                        $scope.ngNoneMore = 'ng-hide';
                    } else {
                        NearbyVar.searchPage++;
                    }
                }
            })
            .error(function(err) {
                $scope.ngNoneGPS = '';
                $scope.ngNoneMore = 'ng-hide';
            })
            .finally(function() {
                $scope.loadingIndicator.hide();
                $scope.items = NearbyVar.items;
                $scope.$broadcast('scroll.refreshComplete');
                // $scope.ngHideSpinner = 'ng-hide';
            })
        ;
    };

    $scope.doRefresh = function() {
        if (window.cordova && window.cordova.plugins && window.cordova.plugins.diagnostic) {
            cordova.plugins.diagnostic.isLocationEnabled(function(enabled){
                if (enabled) {
                    $scope.ngNoneGPS = 'ng-hide';
                    $cordovaToast.show('위치조회중...', 'short', 'center');
                    $scope.loadingIndicator = $ionicLoading.show();
                    cordova.plugins.locationServices.geolocation.getCurrentPosition(onSuccess, onError, CommonVar.geoOptions);
                } else {
                    // $scope.ngNoneGPS = '';
                    // $scope.ngHideSpinner = 'ng-hide';

                    $ionicPopup.confirm({
                        title: '위치 서비스 사용중지',
                        cssClass: 'settingsConfirm',
                        template: '위치 서비스를 켜주시기 바랍니다.',
                        cancelText: '취소',
                        okText: '설정'
                    }).then(function(res) {
                        if(res) {
                            cordova.plugins.diagnostic.switchToLocationSettings();
                        } else {

                        }
                        $scope.items = [];
                        $scope.ngNoneGPS = '';
                        $scope.ngNoneMore = 'ng-hide';
                        $scope.$broadcast('scroll.refreshComplete');
                    });
                }   
            }, function(error){
                $ionicPopup.alert({
                    title: '서비스 에러',
                    cssClass: 'errorAlert',
                    template: error,
                    okText: '확인'
                }).then(function(res) {
                    $scope.ngNoneGPS = '';
                    $scope.ngNoneMore = 'ng-hide';
                    // $scope.ngHideSpinner = 'ng-hide';
                });
            });
        }
    };
    
    $scope.setBookmark = function(_item) {
        var db = $cordovaSQLite.openDB({name: "ae9cc0e9f29"});

        if (_item.bookmark) {
            // 즐겨찾기 제거
            var sql = 'DELETE FROM Favorite WHERE ID = ?';

            $cordovaSQLite.execute(db, sql, [CommonVar.bookmark[_item.placeid].id]).then(function(res) {
                // 북마크 오브젝트 삭제
                delete CommonVar.bookmark[_item.placeid];

                $cordovaToast.show('즐겨찾기에서 제거하였습니다', 'short', 'center');
            }, function (err) {
                $cordovaToast.show(err, 'short', 'center');
            });
        } else {
            // 즐겨찾기 추가
            var sql = 'INSERT INTO Favorite (Name, Tel, Addr, Lat, Long, Img, PlaceID) VALUES (?,?,?,?,?,?,?)';

            $cordovaSQLite.execute(db, sql, [_item.name, _item.tel, _item.address, _item.latitude, _item.longitude, _item.imageUrl, _item.placeid]).then(function(res) {
                CommonVar.bookmark[_item.placeid] = {
                    id: res.insertId,
                    name: _item.name,
                    tel: _item.tel,
                    imageUrl: _item.imageUrl,
                    address: _item.address,
                    latitude: _item.latitude,
                    longitude: _item.longitude,
                    placeid: _item.placeid
                };

                $cordovaToast.show('즐겨찾기에 추가하였습니다', 'short', 'center');
            }, function (err) {
                $cordovaToast.show(err, 'short', 'center');
            });
        }

        _item.bookmark = !_item.bookmark;
    };

    $ionicPlatform.ready(function() {
        $scope.doRefresh();
    });
})


.controller('NearbyMap', function($scope, $ionicPlatform, $ionicLoading, $cordovaToast, $stateParams, $cordovaSQLite, $ionicActionSheet, $timeout, CommonVar, NearbyVar) {
    var map,
        myPosMarker;

    var imageSrc = 'img/ionic.png', // 마커이미지의 주소입니다    
        imageSize = new daum.maps.Size(32, 32), // 마커이미지의 크기입니다
        imageOption = {offset: new daum.maps.Point(27, 69)}; // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.

    // 마커의 이미지정보를 가지고 있는 마커이미지를 생성합니다
    var markerImage = new daum.maps.MarkerImage(imageSrc, imageSize, imageOption);

    $scope.moveMyPosition = function() {
        $scope.loadingIndicator = $ionicLoading.show();

        cordova.plugins.locationServices.geolocation.getCurrentPosition(function(position) {
            // 이동할 위도 경도 위치를 생성합니다 
            var moveLatLon = new daum.maps.LatLng(position.coords.latitude, position.coords.longitude);
            
            // 지도 중심을 이동 시킵니다
            map.setCenter(moveLatLon);

            if (myPosMarker !== undefined) {
                // 마커를 지웁니다
                myPosMarker.setMap(null);
            }
            // 마커를 생성합니다
            myPosMarker = new daum.maps.Marker({
                position: moveLatLon, 
                image: markerImage // 마커이미지 설정 
            });
            // 마커가 지도 위에 표시되도록 설정합니다
            myPosMarker.setMap(map);

            $scope.loadingIndicator.hide();
        }, function(error) {
            // error
            $scope.loadingIndicator.hide();
            $cordovaToast.show('위치조회 실패', 'short', 'center');
        }, CommonVar.geoOptions);
    };

    $scope.markerActionSheet = function(_item) {
        // Show the action sheet
        var hideSheet = $ionicActionSheet.show({
            buttons: [
                { text: '<div style="font-weight:bold;"><i class="icon ion-ios-telephone"></i>전화걸기('+_item.tel+')</div>' },
                { text: '<div style="font-weight:bold;"><i class="icon ion-android-star-outline"></i>즐겨찾기 추가</div>' }
            ],
            // destructiveText: 'Delete',
            titleText: _item.name,
            cancelText: 'Cancel',
            cancel: function() {
                // add cancel code..
            },
            buttonClicked: function(index) {
                if (index == 0) {
                    window.location = 'tel: ' + _item.tel;
                } else if (index == 1) {
                    if (CommonVar.bookmark[_item.placeid] !== undefined) {
                        $cordovaToast.show('이미 등록된 병원입니다', 'short', 'center');
                    } else {
                        var db = $cordovaSQLite.openDB({name: "ae9cc0e9f29"});

                        // 즐겨찾기 추가
                        var sql = 'INSERT INTO Favorite (Name, Tel, Addr, Lat, Long, Img, PlaceID) VALUES (?,?,?,?,?,?,?)';

                        $cordovaSQLite.execute(db, sql, [_item.name, _item.tel, _item.address, _item.latitude, _item.longitude, _item.imageUrl, _item.placeid]).then(function(res) {
                            CommonVar.bookmark[_item.placeid] = {
                                id: res.insertId,
                                name: _item.name,
                                tel: _item.tel,
                                imageUrl: _item.imageUrl,
                                address: _item.address,
                                latitude: _item.latitude,
                                longitude: _item.longitude,
                                placeid: _item.placeid
                            };

                            $cordovaToast.show('즐겨찾기에 추가하였습니다', 'short', 'center');
                        }, function (err) {
                            $cordovaToast.show(err, 'short', 'center');
                        });
                    }
                }
                return true;
            }
        });

        // For example's sake, hide the sheet after two seconds
        $timeout(function() {
            hideSheet();
        }, 5000);
    };

    $ionicPlatform.ready(function() {
        var pLat = $stateParams.lat;
        var pLong = $stateParams.long;
        var locLatLng = new daum.maps.LatLng(pLat, pLong);

        var container = document.getElementById('map'); //지도를 담을 영역의 DOM 레퍼런스
        var options = { //지도를 생성할 때 필요한 기본 옵션
            center: locLatLng, //지도의 중심좌표.
            level: 4 //지도의 레벨(확대, 축소 정도)
        };

        map = new daum.maps.Map(container, options); //지도 생성 및 객체 리턴

        // 나의 위치 마커를 생성합니다
        myPosMarker = new daum.maps.Marker({
            position: new daum.maps.LatLng(CommonVar.lat, CommonVar.long), 
            image: markerImage // 마커이미지 설정 
        });

        // 마커가 지도 위에 표시되도록 설정합니다
        myPosMarker.setMap(map);
        // 마커가 드래그 가능하도록 설정합니다 
        // myPosMarker.setDraggable(true);

        angular.forEach(NearbyVar.items, function(item, _index) {
            // 마커 위치
            var position = new daum.maps.LatLng(item.latitude, item.longitude);

            // 커스텀 오버레이에 표시할 내용입니다     
            // HTML 문자열 또는 Dom Element 입니다 
            var content = '<div class ="marker label"><span class="left"></span><span class="center">'+item.name+'</span><span class="right"></span></div>';

            // 커스텀 오버레이를 생성합니다
            var customOverlay = new daum.maps.CustomOverlay({
                position: position,
                content: content
            });

            // 커스텀 오버레이를 지도에 표시합니다
            customOverlay.setMap(map);

            // 마커를 생성합니다
            var marker = new daum.maps.Marker({
                position: position,
                clickable: true
            });

            // 마커가 지도 위에 표시되도록 설정합니다
            marker.setMap(map);

            // 마커에 클릭이벤트를 등록합니다
            daum.maps.event.addListener(marker, 'click', function() {
                $scope.markerActionSheet(item);
            });
        });
    });
})

.controller('Region', function(
    $scope, $ionicPlatform, $cordovaToast, $ionicLoading, $ionicScrollDelegate,
    DaumAPI, CommonVar, RegionVar, ConstProvince) {

    var preProvince;
    $scope.toggleProvinceGroup = function(e, _province) {
        if (!_province.Show) {
            $scope.loadingIndicator = $ionicLoading.show();

            setTimeout(function () {
                $scope.loadingIndicator.hide();

                $ionicScrollDelegate.$getByHandle('mainScroll').scrollTo(0, (Number(_province.ID)-1) * 54);
            }, 1000);
        }

        _province.Show = !_province.Show

        if (preProvince !== _province) {
            if (preProvince !== undefined) {
                preProvince.Show = false;
            }
            preProvince = _province;
        }

        if (_province.Countries.length == 0) {
            _province.Countries = ConstProvince.Country[_province.Name];
        }
    };

    $scope.linkMap = function(_pName, _cName) {
        // #/tab/nearby/{{item.latitude}}/{{item.longitude}}
        DaumAPI.addr2coord(_pName+' '+_cName)
            .success(function(data) {
                var items = data.channel.item;

                RegionVar.lat = items[0].lat;
                RegionVar.long = items[0].lng;
                RegionVar.searchPage = 1;

                window.location = '#/tab/region/' + RegionVar.lat+'/'+RegionVar.long;
            })
            .error(function(err) {
                $cordovaToast.show(angular.toJson(err), 'short', 'center');
            })
        ;
    };

    $ionicPlatform.ready(function() {
        $scope.Provinces = ConstProvince.Province;
    });
})

.controller('RegionMap', function($scope, $ionicPlatform, $ionicLoading, $stateParams, $cordovaToast, $cordovaSQLite, $ionicActionSheet, DaumAPI, CommonVar, RegionVar) {
    var map,
        myPosMarker;

    var imageSrc = 'img/ionic.png', // 마커이미지의 주소입니다    
        imageSize = new daum.maps.Size(32, 32), // 마커이미지의 크기입니다
        imageOption = {offset: new daum.maps.Point(27, 69)}; // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.

    // 마커의 이미지정보를 가지고 있는 마커이미지를 생성합니다
    var markerImage = new daum.maps.MarkerImage(imageSrc, imageSize, imageOption);

    var drawHospitalMaker = function() {
        RegionVar.searchPage = 1;
        RegionVar.keys = [];

        for (var i=0; i<3; i++) {
            DaumAPI.search(RegionVar)
                .success(function(data) {
                    var items = data.channel.item;

                    if (items.length > 1) {
                        angular.forEach(items, function(item, _index) {
                            if (RegionVar.keys.indexOf(item.id) < 0) {
                                RegionVar.keys.push(item.id);
                                // 마커 위치
                                var position = new daum.maps.LatLng(item.latitude, item.longitude);

                                // 커스텀 오버레이에 표시할 내용입니다     
                                // HTML 문자열 또는 Dom Element 입니다 
                                var content = '<div class ="marker label"><span class="left"></span><span class="center">'+item.title+'</span><span class="right"></span></div>';

                                // 커스텀 오버레이를 생성합니다
                                var customOverlay = new daum.maps.CustomOverlay({
                                    position: position,
                                    content: content   
                                });

                                // 커스텀 오버레이를 지도에 표시합니다
                                customOverlay.setMap(map);

                                // 마커를 생성합니다
                                var marker = new daum.maps.Marker({
                                    position: position
                                });

                                // 마커가 지도 위에 표시되도록 설정합니다
                                marker.setMap(map);

                                // 마커에 클릭이벤트를 등록합니다
                                daum.maps.event.addListener(marker, 'click', function() {
                                    $scope.markerActionSheet(item);
                                });
                            }
                        });
                    }
                    RegionVar.searchPage++;
                })
                .error(function(err) {
                    $cordovaToast.show(angular.toJson(err), 'short', 'center');
                })
                .finally(function() {

                })
            ;
        }
    };

    $scope.moveMyPosition = function() {
        $scope.loadingIndicator = $ionicLoading.show();

        cordova.plugins.locationServices.geolocation.getCurrentPosition(function(position) {
            // 이동할 위도 경도 위치를 생성합니다 
            var moveLatLon = new daum.maps.LatLng(position.coords.latitude, position.coords.longitude);
            
            // 지도 중심을 이동 시킵니다
            map.setCenter(moveLatLon);

            if (myPosMarker !== undefined) {
                // 마커를 지웁니다
                myPosMarker.setMap(null);
            }
            // 마커를 생성합니다
            myPosMarker = new daum.maps.Marker({
                position: moveLatLon, 
                image: markerImage // 마커이미지 설정 
            });
            // 마커가 지도 위에 표시되도록 설정합니다
            myPosMarker.setMap(map);

            $scope.loadingIndicator.hide();
        }, function(error) {
            // error
            $scope.loadingIndicator.hide();
            $cordovaToast.show('위치조회 실패', 'short', 'center');
        }, CommonVar.geoOptions);
    };

    $scope.markerActionSheet = function(_item) {
        // Show the action sheet
        var hideSheet = $ionicActionSheet.show({
            buttons: [
                { text: '<div style="font-weight:bold;"><i class="icon ion-ios-telephone"></i>전화걸기('+_item.phone+')</div>' },
                { text: '<div style="font-weight:bold;"><i class="icon ion-android-star-outline"></i>즐겨찾기 추가</div>' }
            ],
            // destructiveText: 'Delete',
            titleText: _item.title,
            cancelText: 'Cancel',
            cancel: function() {
                // add cancel code..
            },
            buttonClicked: function(index) {
                if (index == 0) {
                    window.location = 'tel: ' + _item.phone;
                } else if (index == 1) {
                    if (CommonVar.bookmark[_item.id] !== undefined) {
                        $cordovaToast.show('이미 등록된 병원입니다', 'short', 'center');
                    } else {
                        if (_item.imageUrl == '') {
                            _item.imageUrl = 'img/default_avatar.png';
                        }
                        
                        var db = $cordovaSQLite.openDB({name: "ae9cc0e9f29"});

                        // 즐겨찾기 추가
                        var sql = 'INSERT INTO Favorite (Name, Tel, Addr, Lat, Long, Img, PlaceID) VALUES (?,?,?,?,?,?,?)';

                        $cordovaSQLite.execute(db, sql, [_item.title, _item.phone, _item.address, _item.latitude, _item.longitude, _item.imageUrl, _item.id]).then(function(res) {
                            CommonVar.bookmark[_item.id] = {
                                id: res.insertId,
                                name: _item.title,
                                tel: _item.phone,
                                imageUrl: _item.imageUrl,
                                address: _item.address,
                                latitude: _item.latitude,
                                longitude: _item.longitude,
                                placeid: _item.id
                            };

                            $cordovaToast.show('즐겨찾기에 추가하였습니다', 'short', 'center');
                        }, function (err) {
                            $cordovaToast.show(err, 'short', 'center');
                        });
                    }
                }
                return true;
            }
        });

        // For example's sake, hide the sheet after two seconds
        $timeout(function() {
            hideSheet();
        }, 5000);
    };

    $ionicPlatform.ready(function() {
        var pLat = $stateParams.lat;
        var pLong = $stateParams.long;
        var locLatLng = new daum.maps.LatLng(pLat, pLong);

        var container = document.getElementById('regionmap'); //지도를 담을 영역의 DOM 레퍼런스
        var options = { //지도를 생성할 때 필요한 기본 옵션
            center: locLatLng, //지도의 중심좌표.
            level: 6 //지도의 레벨(확대, 축소 정도)
        };

        map = new daum.maps.Map(container, options); //지도 생성 및 객체 리턴

        /*// 나의 위치 마커를 생성합니다
        myPosMarker = new daum.maps.Marker({
            position: new daum.maps.LatLng(CommonVar.lat, CommonVar.long),
            image: markerImage // 마커이미지 설정 
        });

        // 마커가 지도 위에 표시되도록 설정합니다
        myPosMarker.setMap(map);
        // 마커가 드래그 가능하도록 설정합니다 
        // myPosMarker.setDraggable(true);*/

        drawHospitalMaker();
    });
})

.controller('Bookmark', function($scope, $ionicPlatform, $cordovaSQLite, $cordovaToast, $controller, CommonVar, NearbyVar) {
    $scope.showDelete = false;
    $scope.edit = false;
    $scope.items = [];

    $scope.toggleEdit = function() {
        if (Object.keys($scope.items).length > 0 || $scope.showDelete) {
            $scope.showDelete = !$scope.showDelete;
            $scope.edit = !$scope.edit;
        }
    };

    $scope.removeBookmark = function(_item) {
        var db = $cordovaSQLite.openDB({name: "ae9cc0e9f29"});

        // 즐겨찾기 제거
        var sql = 'DELETE FROM Favorite WHERE ID = ?';

        $cordovaSQLite.execute(db, sql, [CommonVar.bookmark[_item.placeid].id]).then(function(res) {
            // 북마크 오브젝트 삭제
            delete CommonVar.bookmark[_item.placeid];

            // $scope.items = CommonVar.bookmark;

            if (Object.keys($scope.items).length == 0) {
                $scope.showDelete = !$scope.showDelete;
                $scope.edit = !$scope.edit;
            }

            angular.forEach(NearbyVar.items, function(item, _index) {
                if (_item.placeid == item.placeid) {
                    item.bookmark = false;
                    return true;
                }
            });
        }, function (err) {
            $cordovaToast.show(err, 'short', 'center');
        });
    };

    $ionicPlatform.ready(function() {
        $scope.items = CommonVar.bookmark;

        $scope.messages = angular.toJson(CommonVar.bookmark);
    });
})

.controller('BookmarkMap', function($scope, $ionicPlatform, $ionicLoading, $stateParams, $cordovaToast, CommonVar) {
    var map,
        myPosMarker;

    var imageSrc = 'img/ionic.png', // 마커이미지의 주소입니다    
        imageSize = new daum.maps.Size(32, 32), // 마커이미지의 크기입니다
        imageOption = {offset: new daum.maps.Point(27, 69)}; // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.

    // 마커의 이미지정보를 가지고 있는 마커이미지를 생성합니다
    var markerImage = new daum.maps.MarkerImage(imageSrc, imageSize, imageOption);

    $scope.moveMyPosition = function() {
        $scope.loadingIndicator = $ionicLoading.show();

        cordova.plugins.locationServices.geolocation.getCurrentPosition(function(position) {
            // 이동할 위도 경도 위치를 생성합니다 
            var moveLatLon = new daum.maps.LatLng(position.coords.latitude, position.coords.longitude);
            
            // 지도 중심을 이동 시킵니다
            map.setCenter(moveLatLon);

            if (myPosMarker !== undefined) {
                // 마커를 지웁니다
                myPosMarker.setMap(null);
            }
            // 마커를 생성합니다
            myPosMarker = new daum.maps.Marker({
                position: moveLatLon, 
                image: markerImage // 마커이미지 설정 
            });
            // 마커가 지도 위에 표시되도록 설정합니다
            myPosMarker.setMap(map);

            $scope.loadingIndicator.hide();
        }, function(error) {
            // error
            $scope.loadingIndicator.hide();
            $cordovaToast.show('위치조회 실패', 'short', 'center');
        }, CommonVar.geoOptions);
    };

    $ionicPlatform.ready(function() {
        var pName = $stateParams.name;
        var pLat = $stateParams.lat;
        var pLong = $stateParams.long;
        var locLatLng = new daum.maps.LatLng(pLat, pLong);

        var container = document.getElementById('bookmarkmap'); //지도를 담을 영역의 DOM 레퍼런스
        var options = { //지도를 생성할 때 필요한 기본 옵션
            center: locLatLng, //지도의 중심좌표.
            level: 5 //지도의 레벨(확대, 축소 정도)
        };

        map = new daum.maps.Map(container, options); //지도 생성 및 객체 리턴

        // 커스텀 오버레이에 표시할 내용입니다     
        // HTML 문자열 또는 Dom Element 입니다 
        var content = '<div class ="marker label"><span class="left"></span><span class="center">'+pName+'</span><span class="right"></span></div>';

        // 커스텀 오버레이를 생성합니다
        var customOverlay = new daum.maps.CustomOverlay({
            position: locLatLng,
            content: content   
        });

        // 커스텀 오버레이를 지도에 표시합니다
        customOverlay.setMap(map);

        // 마커를 생성합니다
        var marker = new daum.maps.Marker({
            position: locLatLng
        });

        // 마커가 지도 위에 표시되도록 설정합니다
        marker.setMap(map);
    });
})

;
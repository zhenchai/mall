/*
 * Copyright 2013 NINGPAI, Inc.All rights reserved.
 * NINGPAI PROPRIETARY / CONFIDENTIAL.USE is subject to licence terms.
 */
package com.ningpai.other.bean;

import java.io.Serializable;

/**
 * 街道信息Bean
 * 
 * @author NINGPAI-zhangqiang
 * @since 2013年12月31日 下午3:00:08
 * @version 0.0.1
 */
public class StreetBean implements Serializable {
    /**
     * 序列化
     */
    private static final long serialVersionUID = -9040493709650496617L;
    // 街道编号
    private Long streetId;
    // 街道名称
    private String streetName;
    // 区县编号
    private Long districtId;

    public Long getStreetId() {
        return streetId;
    }

    public void setStreetId(Long streetId) {
        this.streetId = streetId;
    }

    public String getStreetName() {
        return streetName;
    }

    public void setStreetName(String streetName) {
        this.streetName = streetName;
    }

    public Long getDistrictId() {
        return districtId;
    }

    public void setDistrictId(Long districtId) {
        this.districtId = districtId;
    }
}

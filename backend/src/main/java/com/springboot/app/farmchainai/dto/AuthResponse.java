package com.springboot.app.farmchainai.dto;

import com.springboot.app.farmchainai.entity.Role;

public class AuthResponse {
    private boolean success;
    private String message;
    private Long userId;
    private String userCode;
    private String name;
    private Role role;
    private String phone;
    private String city;
    private String state;

    public AuthResponse() {}

    public AuthResponse(boolean success, String message, Long userId, String userCode, String name, Role role, String phone, String city, String state) {
        this.success = success;
        this.message = message;
        this.userId = userId;
        this.userCode = userCode;
        this.name = name;
        this.role = role;
        this.phone = phone;
        this.city = city;
        this.state = state;
    }

    public boolean isSuccess() { return success; }
    public void setSuccess(boolean success) { this.success = success; }

    public String getMessage() { return message; }
    public void setMessage(String message) { this.message = message; }

    public Long getUserId() { return userId; }
    public void setUserId(Long userId) { this.userId = userId; }

    public String getUserCode() { return userCode; }
    public void setUserCode(String userCode) { this.userCode = userCode; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public Role getRole() { return role; }
    public void setRole(Role role) { this.role = role; }

    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }

    public String getCity() { return city; }
    public void setCity(String city) { this.city = city; }

    public String getState() { return state; }
    public void setState(String state) { this.state = state; }
}

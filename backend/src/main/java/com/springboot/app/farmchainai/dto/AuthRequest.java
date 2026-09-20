package com.springboot.app.farmchainai.dto;

import com.springboot.app.farmchainai.entity.Role;

public class AuthRequest {

    public static class Login {
        private String phone;
        private String password;

        public Login() {}
        public Login(String phone, String password) {
            this.phone = phone;
            this.password = password;
        }

        public String getPhone() { return phone; }
        public void setPhone(String phone) { this.phone = phone; }

        public String getPassword() { return password; }
        public void setPassword(String password) { this.password = password; }
    }

    public static class Register {
        private String userCode;
        private String name;
        private String phone;
        private String email;
        private String password;
        private Role role;
        private String city;
        private String district;
        private String state;

        public Register() {}
        public Register(String userCode, String name, String phone, String email, String password, Role role, String city, String district, String state) {
            this.userCode = userCode;
            this.name = name;
            this.phone = phone;
            this.email = email;
            this.password = password;
            this.role = role;
            this.city = city;
            this.district = district;
            this.state = state;
        }

        public String getUserCode() { return userCode; }
        public void setUserCode(String userCode) { this.userCode = userCode; }

        public String getName() { return name; }
        public void setName(String name) { this.name = name; }

        public String getPhone() { return phone; }
        public void setPhone(String phone) { this.phone = phone; }

        public String getEmail() { return email; }
        public void setEmail(String email) { this.email = email; }

        public String getPassword() { return password; }
        public void setPassword(String password) { this.password = password; }

        public Role getRole() { return role; }
        public void setRole(Role role) { this.role = role; }

        public String getCity() { return city; }
        public void setCity(String city) { this.city = city; }

        public String getDistrict() { return district; }
        public void setDistrict(String district) { this.district = district; }

        public String getState() { return state; }
        public void setState(String state) { this.state = state; }
    }
}

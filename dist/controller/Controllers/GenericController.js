"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class GenericController {
    constructor(repository) {
        this.repository = repository;
    }
    getType() {
        return this.constructor.name;
    }
    async read(param) {
        return await this.repository.read(param);
    }
    async update(param, ...args) {
        const entity = await this.repository.read(param);
        if (!entity) {
            return false;
        }
        return await this.repository.update(entity.getId(), ...args);
    }
    async delete(param) {
        const entity = await this.repository.read(param);
        if (!entity) {
            return false;
        }
        return await this.repository.delete(entity.getId());
    }
    async list() {
        return await this.repository.readAll();
    }
}
exports.default = GenericController;
